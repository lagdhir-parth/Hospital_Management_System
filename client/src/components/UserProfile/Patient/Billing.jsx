import React, { useEffect, useState, useCallback } from "react";
import api from "../../../api/axios";
import BillCard from "../BillCard";
import { AlertCircle, CheckCircle2, Receipt } from "lucide-react";

const Billing = () => {
  const [bills, setBills] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); // ✅ Trigger refetch

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const res = await api.get("/bills/getUserBills");
        setBills(res.data.data || []);
      } catch (error) {
        console.error("Error fetching billing data:", error);
      }
    };
    fetchBillingData();
  }, [refreshKey]); // ✅ Refetch on refreshKey change

  // Memoized totals (recalculates when bills changes)
  const summaryTotals = {
    totalPending: bills
      .filter((bill) => bill.paymentStatus === "Pending")
      .reduce((sum, bill) => sum + bill.amount, 0),
    totalPaid: bills
      .filter((bill) => bill.paymentStatus === "Paid")
      .reduce((sum, bill) => sum + bill.amount, 0),
    grandTotal: bills.reduce((sum, bill) => sum + bill.amount, 0),
  };

  // ✅ Pass refresh callback (no bills dependency)
  const handleBillPaid = useCallback(() => {
    setRefreshKey((prev) => prev + 1); // Triggers bills refetch
  }, []);

  if (!bills.length) {
    return (
      <div className="text-center py-20 px-6">
        <Receipt className="size-20 mx-auto mb-6 text-(--color-text-muted) opacity-50" />
        <h3 className="text-2xl font-bold text-(--color-text) mb-3">
          No bills yet
        </h3>
        <p className="text-(--color-text-muted) text-lg max-w-md mx-auto">
          Your billing history will appear here after your appointments
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Summary Cards - Uses memoized totals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="border border-(--color-border) rounded-2xl bg-(--color-surface) p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-2xl">
            <AlertCircle className="size-8 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-(--color-text)">
            ₹{summaryTotals.totalPending.toLocaleString()}
          </h3>
          <p className="text-(--color-text-muted) text-lg mt-1">Pending</p>
        </div>

        <div className="border border-(--color-border) rounded-2xl bg-(--color-surface) p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-2xl">
            <CheckCircle2 className="size-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-(--color-text)">
            ₹{summaryTotals.totalPaid.toLocaleString()}
          </h3>
          <p className="text-(--color-text-muted) text-lg mt-1">Paid</p>
        </div>

        <div className="border border-(--color-border) rounded-2xl bg-linear-to-br from-(--color-primary)/5 to-(--color-primary)/10 p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
          <Receipt className="size-12 mx-auto mb-4 text-(--color-primary)" />
          <h3 className="text-3xl font-bold bg-linear-to-r from-(--color-primary) to-(--color-primary-dark) bg-clip-text text-transparent">
            ₹{summaryTotals.grandTotal.toLocaleString()}
          </h3>
          <p className="text-(--color-text-muted) text-lg mt-1">Total Spent</p>
        </div>
      </div>

      {/* Pass refresh callback instead of totals updater */}
      <BillCard bills={bills} onBillPaid={handleBillPaid} />
    </div>
  );
};

export default Billing;
