import React, { useState } from "react";
import api from "../../../api/axios";
import {
  User,
  Stethoscope,
  Calendar,
  DollarSign,
  CreditCard,
  CheckCircle2,
  Clock,
  Trash2,
} from "lucide-react";

const AdminBillCard = ({ bills = [], refreshBills }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (billId) => {
    if (!confirm("Delete this bill?")) return;

    try {
      setDeletingId(billId);
      await api.delete(`/bills/deleteBill/${billId}`);
      refreshBills();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (!bills.length) {
    return (
      <div className="col-span-full text-center py-20">
        <DollarSign className="size-20 mx-auto mb-6 text-(--color-text-muted) opacity-50" />
        <h3 className="text-2xl font-bold text-(--color-text)">No Bills</h3>
        <p className="text-lg text-(--color-text-muted)">No bills found</p>
      </div>
    );
  }

  const statusConfig = {
    Paid: {
      icon: CheckCircle2,
      color: "text-green-600 bg-green-50 border-green-200",
    },
    Pending: {
      icon: Clock,
      color: "text-orange-600 bg-orange-50 border-orange-200",
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {bills.map((bill) => {
        const StatusIcon = statusConfig[bill.paymentStatus]?.icon || Clock;
        const statusClass =
          statusConfig[bill.paymentStatus]?.color ||
          "text-gray-600 bg-gray-50 border-gray-200";

        return (
          <div
            key={bill._id}
            className="group bg-(--color-surface) border border-(--color-border) rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden h-full"
          >
            {/* Header */}
            {deletingId === bill._id && (
              <div className="absolute inset-0 bg-red-500/95 backdrop-blur-sm flex items-center justify-center z-20">
                <div className="text-center text-white p-4">
                  <Trash2 className="size-12 mx-auto mb-3 animate-bounce" />
                  <p className="text-lg font-bold">Deleting...</p>
                </div>
              </div>
            )}

            <div className="p-5 pb-4 border-b border-(--color-border)/50">
              <div className="flex items-start gap-3 mb-2">
                <div className="size-10 rounded-xl bg-linear-to-br from-(--color-primary)/10 flex items-center justify-center">
                  <User className="size-5 text-(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-(--color-text) truncate">
                    {bill.patientId?.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-(--color-text-muted)">
                    <Stethoscope className="size-3" />
                    <span className="truncate">{bill.doctorId?.name}</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm ${statusClass}`}
              >
                <StatusIcon className="size-3.5" />
                {bill.paymentStatus}
              </div>
            </div>

            {/* Amount */}
            <div className="p-5 text-center border-b border-(--color-border)/50">
              <div className="inline-flex items-center gap-2 bg-linear-to-r from-green-50 to-emerald-50 border border-green-200 px-4 py-2 rounded-xl">
                <DollarSign className="size-5 text-green-600" />
                <span className="text-2xl font-black text-green-700">
                  ₹{bill.amount?.toLocaleString()}
                </span>
              </div>
              {bill.paymentMethod && (
                <p className="text-xs text-(--color-text-muted) mt-2">
                  {bill.paymentMethod}
                </p>
              )}
            </div>

            {/* Date */}
            <div className="p-5 pt-3">
              <div className="flex items-center gap-2 text-xs text-(--color-text-muted)">
                <Calendar className="size-4" />
                <span>
                  {new Intl.DateTimeFormat("en-IN", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "UTC",
                  }).format(new Date(bill.createdAt))}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 border-t border-(--color-border)/50">
              <div className="flex gap-2">
                <button className="flex-1 bg-linear-to-r from-(--color-primary) to-(--color-primary-dark) hover:from-(--color-primary-dark) hover:to-(--color-primary) text-white font-bold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-xs">
                  View Details
                </button>
                <button
                  onClick={() => handleDelete(bill._id)}
                  disabled={deletingId === bill._id}
                  className="px-3 py-2 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-xs flex items-center justify-center gap-1.5 disabled:opacity-60"
                >
                  {deletingId === bill._id ? (
                    <div className="animate-spin size-3 border border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <Trash2 className="size-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminBillCard;
