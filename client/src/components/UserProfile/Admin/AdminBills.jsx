import React, { useEffect, useState, useMemo } from "react";
import api from "../../../api/axios";
import AdminBillCard from "./AdminBIllCard";
import { Search, DollarSign, Filter } from "lucide-react";

const AdminBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      setLoading(true);
      const res = await api.get("/bills/getAllBills");
      setBills(res.data.data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBills = useMemo(() => {
    return bills
      .filter((bill) => {
        const matchesSearch =
          !search ||
          bill.patientId?.name?.toLowerCase().includes(search.toLowerCase()) ||
          bill.doctorId?.name?.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
          statusFilter === "all" || bill.paymentStatus === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [bills, search, statusFilter]);

  const stats = {
    total: bills.length,
    pending: bills.filter((b) => b.paymentStatus === "Pending").length,
    paid: bills.filter((b) => b.paymentStatus === "Paid").length,
    revenue: bills.reduce(
      (sum, b) => sum + (b.paymentStatus === "Paid" ? b.amount : 0),
      0,
    ),
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-(--color-primary)"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border border-(--color-border) rounded-2xl bg-(--color-surface) shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-(--color-text)">
              Bills ({filteredBills.length})
            </h1>
          </div>

          <div className="flex gap-3 flex-wrap">
            <div className="grid grid-cols-2 gap-2 items-center p-3 rounded-xl bg-linear-to-br from-green-50 text-center shadow-sm">
              <div className="text-lg font-black text-green-600">
                ₹{stats.revenue.toLocaleString()}
              </div>
              <div className="text-xs text-green-700">Revenue</div>
            </div>
            <div className="grid grid-cols-2 gap-2 items-center p-3 rounded-xl bg-linear-to-br from-(--color-primary)/5 text-center shadow-sm">
              <div className="text-lg font-black text-(--color-primary)">
                {stats.total}
              </div>
              <div className="text-xs text-(--color-text-muted)">Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border border-(--color-border) rounded-2xl bg-(--color-surface) shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search patient/doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary)/20 focus:border-(--color-primary) transition-all text-sm"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary)/20 focus:border-(--color-primary) transition-all text-sm min-w-[120px]"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
      </div>

      <AdminBillCard bills={filteredBills} refreshBills={fetchBills} />
    </div>
  );
};

export default AdminBills;
