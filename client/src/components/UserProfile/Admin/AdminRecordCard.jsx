import React, { useState } from "react";
import api from "../../../api/axios";
import {
  User,
  Stethoscope,
  Calendar,
  FileText,
  Receipt,
  Pill,
  Trash2,
} from "lucide-react";

const AdminRecordCard = ({ records = [], refreshRecords }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (recordId) => {
    if (!confirm("Delete this medical record?")) return;

    try {
      setDeletingId(recordId);
      await api.delete(`/medicalRecords/${recordId}/delete`);
      refreshRecords();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (!records.length) {
    return (
      <div className="col-span-full text-center py-20">
        <FileText className="size-20 mx-auto mb-6 text-(--color-text-muted) opacity-50" />
        <h3 className="text-2xl font-bold text-(--color-text)">No Records</h3>
        <p className="text-lg text-(--color-text-muted)">
          No medical records found
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {records.map((record) => (
        <div
          key={record._id}
          className="group flex flex-col bg-(--color-surface) border border-(--color-border) rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden h-full"
        >
          {/* Header */}
          <div className="p-5 pb-4 border-b border-(--color-border)/50">
            <div className="flex items-start gap-3 mb-3">
              <div className="size-12 rounded-xl bg-linear-to-br from-(--color-primary)/10 to-(--color-primary-light)/10 flex items-center justify-center shadow-md group-hover:scale-105">
                <User className="size-6 text-(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-base text-(--color-text) truncate mb-1">
                  {record.patientId?.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-(--color-text-muted)">
                  <Stethoscope className="size-3.5" />
                  <span className="truncate">{record.doctorId?.name}</span>
                </div>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-(--color-text-muted)">
              <Calendar className="size-4" />
              <span>
                {new Intl.DateTimeFormat("en-IN", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  timeZone: "UTC",
                }).format(new Date(record.appointmentId?.dateTime))}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="h-full p-5 space-y-3">
            {/* Appointment */}
            <div className="p-3 bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
              <p className="text-sm font-medium text-(--color-text) line-clamp-2">
                {record.appointmentId?.reason || "Consultation"}
              </p>
              <p className="text-xs text-(--color-text-muted) mt-1">
                Conditions: {record.appointmentId?.diseases || "None"}
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {record.prescriptionId && (
                <div className="group p-2.5 bg-linear-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl hover:shadow-sm cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <Pill className="size-4 text-emerald-600" />
                    <span className="font-bold text-xs text-emerald-800">
                      Rx
                    </span>
                  </div>
                  <p className="text-xs text-emerald-700">Prescription</p>
                </div>
              )}

              {record.billId && (
                <div className="group p-2.5 bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl hover:shadow-sm cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <Receipt className="size-4 text-blue-600" />
                    <span className="font-bold text-xs text-blue-800">
                      Bill
                    </span>
                  </div>
                  <p className="text-xs text-blue-700">
                    ₹{record.billId?.amount}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="p-5 pt-3 border-t border-(--color-border)/50">
            <div className="flex gap-2">
              <button className="flex-1 bg-linear-to-r from-(--color-primary) to-(--color-primary-dark) hover:from-(--color-primary-dark) hover:to-(--color-primary) text-white font-bold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-xs flex items-center justify-center gap-1.5">
                View Record
              </button>
              <button
                onClick={() => handleDelete(record._id)}
                disabled={deletingId === record._id}
                className="px-3 py-2 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-xs flex items-center justify-center gap-1.5 disabled:opacity-60"
              >
                {deletingId === record._id ? (
                  <div className="animate-spin size-3.5 border border-white border-t-transparent rounded-full"></div>
                ) : (
                  <Trash2 className="size-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminRecordCard;
