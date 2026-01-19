import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Receipt,
  Calendar,
  User,
  FileText,
  Clock,
} from "lucide-react";
import api from "../../api/axios";
import ErrorOrSuccessMsg from "../ErrorOrSuccessMsg";

const paymentMethodIcons = {
  "Credit Card": CreditCard,
  "Debit Card": CreditCard,
  Insurance: FileText,
  "Online Payment": Receipt,
};

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Paid: "bg-green-100 text-green-800 border-green-200",
};

const BillCard = ({ bills = [], onBillPaid }) => {
  // ✅ Per-bill loading + global messages
  const [loadingBills, setLoadingBills] = useState({}); // { billId: true/false }
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const payBill = async (billId) => {
    if (!billId) {
      setErrorMessage("Invalid bill ID.");
      return;
    }

    // ✅ Set loading ONLY for this bill
    setLoadingBills((prev) => ({ ...prev, [billId]: true }));
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await api.patch("/bills/updatePayment", {
        billId,
        paymentMethod: "Online Payment",
      });

      setSuccessMessage("✅ Bill paid successfully!");
      onBillPaid?.(); // Refresh parent data
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to pay bill. Please try again.",
      );
    } finally {
      // ✅ Clear ONLY this bill's loading
      setLoadingBills((prev) => ({ ...prev, [billId]: false }));
    }
  };

  // ✅ Helper: Is this specific bill loading?
  const isBillLoading = (billId) => loadingBills[billId];

  return (
    <div className="space-y-8">
      <ErrorOrSuccessMsg
        successMessage={successMessage}
        errorMessage={errorMessage}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
      />

      {/* Bills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
        {bills.map((bill) => (
          <div
            key={bill._id}
            className="border border-(--color-border) rounded-2xl bg-(--color-surface) shadow-lg hover:shadow-2xl transition-all duration-300 group p-8 h-full flex flex-col relative overflow-hidden"
          >
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-(--color-primary)/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Header: Status + Amount */}
            <div className="relative z-10 flex justify-between items-start mb-6">
              <span
                className={`px-4 py-2 rounded-xl text-sm font-bold border ${
                  statusColors[bill.paymentStatus] ||
                  "bg-gray-100 text-gray-800 border-gray-200"
                }`}
              >
                {bill.paymentStatus}
              </span>
              <div className="text-right">
                <h3 className="text-3xl font-bold text-(--color-text)">
                  ₹{bill.amount.toLocaleString()}
                </h3>
                <p className="text-(--color-text-muted) text-sm mt-1">
                  Bill Amount
                </p>
              </div>
            </div>

            {/* Doctor + Date */}
            <div className="relative z-10 space-y-4 mb-6">
              <div className="flex items-center gap-3 p-4 bg-(--color-light-primary-bg)/50 rounded-xl group-hover:bg-(--color-primary)/5 transition-all duration-300">
                <div className="size-12 rounded-full bg-linear-to-br from-(--color-primary)/20 to-(--color-primary-dark)/20 flex items-center justify-center shadow-lg">
                  <User className="size-6 text-(--color-primary)" />
                </div>
                <div>
                  <h4 className="font-bold text-(--color-text) text-lg">
                    {bill.doctorId?.name || "Dr. Unknown"}
                  </h4>
                  <p className="text-(--color-text-muted) text-sm">
                    {bill.doctorId?.specialization || "Consultation"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-(--color-text-muted)">
                <Calendar className="size-5 shrink-0" />
                <span>
                  {new Date(
                    bill.appointmentId?.dateTime || bill.createdAt,
                  ).toLocaleDateString("en-IN", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* ✅ FIXED: Pay Button or Payment Method PER BILL */}
            <div className="relative z-10 mb-6">
              {bill.paymentMethod ? (
                // Paid bill - show method
                <div className="p-4 bg-linear-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3">
                    {React.createElement(
                      paymentMethodIcons[bill.paymentMethod],
                      {
                        className: "size-6 text-green-600 flex-shrink-0",
                      },
                    )}
                    <div>
                      <p className="font-semibold text-(--color-text)">
                        Paid via
                      </p>
                      <p className="text-sm text-(--color-text-muted) capitalize font-medium">
                        {bill.paymentMethod}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // Pending bill - show pay button
                <button
                  onClick={() => payBill(bill._id)}
                  disabled={isBillLoading(bill._id)} // ✅ Per-bill loading!
                  className="w-full px-4 py-2 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-lg"
                >
                  {isBillLoading(bill._id) ? ( // ✅ Check THIS bill only!
                    <>
                      <svg className="animate-spin size-6" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Paying...
                    </>
                  ) : (
                    `Pay Now ₹${bill.amount.toLocaleString()}`
                  )}
                </button>
              )}
            </div>

            {/* Footer */}
            <div className="relative z-10 mt-auto pt-6 border-t border-(--color-border)/50 text-xs text-(--color-text-muted) flex items-center gap-2">
              <Clock className="size-4" />
              Generated{" "}
              {new Date(bill.createdAt).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillCard;
