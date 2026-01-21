import React from "react";
import {
  User,
  Calendar,
  FileText,
  Receipt,
  Pill,
  Download,
  Eye,
  MapPin,
  AlertCircle,
} from "lucide-react";

const DoctorMedicalRecordCard = ({ records = [] }) => {
  if (!records.length) {
    return (
      <div className="col-span-full text-center py-20">
        <FileText className="size-24 mx-auto mb-6 text-(--color-text-muted) opacity-30" />
        <h3 className="text-3xl font-bold text-(--color-text) mb-2">
          No Medical Records
        </h3>
        <p className="text-xl text-(--color-text-muted) max-w-xl mx-auto">
          No medical records match your current filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {records.map((record) => (
        <div
          key={record._id}
          className="group border border-(--color-border) rounded-2xl bg-(--color-surface) shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full flex flex-col p-6"
        >
          {/* Header: Patient + Date */}
          <div className="border-b border-(--color-border)/50 pb-4 mb-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="size-14 rounded-xl bg-linear-to-br from-(--color-primary)/10 to-(--color-primary-light)/10 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <User className="size-7 text-(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xl text-(--color-text) truncate mb-1">
                  {record.patientId?.name || "Patient"}
                </h4>
                <div className="flex items-center gap-2 text-sm text-(--color-text-muted)">
                  <Calendar className="size-4.5" />
                  <span className="truncate">
                    {new Intl.DateTimeFormat("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      timeZone: "UTC", // ✅ UTC timezone
                    }).format(new Date(record.appointmentId?.dateTime))}
                  </span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-base shadow-sm ${
                record.appointmentId?.status === "Completed"
                  ? "bg-green-100 text-green-800 border-green-200"
                  : "bg-orange-100 text-orange-800 border-orange-200"
              }`}
            >
              {record.appointmentId?.status || "Pending"}
            </div>
          </div>

          {/* Content */}
          <div className="grow space-y-4 mb-4">
            {/* Reason */}
            <div className="space-y-2">
              <h5 className="flex items-center gap-2 text-sm font-bold text-(--color-text-muted)">
                <MapPin className="size-4" />
                Reason
              </h5>
              <div className="bg-linear-to-r from-blue-50/80 to-indigo-50/80 border border-blue-100 rounded-xl p-4">
                <p className="text-base text-(--color-text) font-medium leading-relaxed line-clamp-2">
                  {record.appointmentId?.reason || "Consultation"}
                </p>
              </div>
            </div>

            {/* Diseases */}
            <div className="space-y-2">
              <h5 className="flex items-center gap-2 text-sm font-bold text-(--color-text-muted)">
                <AlertCircle className="size-4 text-red-500" />
                Conditions
              </h5>
              <div className="bg-red-50/80 border border-red-100 rounded-xl p-4">
                <p className="text-sm text-red-800 font-semibold leading-relaxed">
                  {record.appointmentId?.diseases || "None reported"}
                </p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-3 mb-5 pt-2">
            {record.prescriptionId && (
              <div className="group p-3.5 bg-linear-to-r from-emerald-50/80 to-green-50/80 border border-emerald-200 rounded-xl hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <Pill className="size-4.5 text-emerald-600" />
                  <span className="font-bold text-emerald-800 text-sm">Rx</span>
                </div>
                <p className="text-sm text-emerald-700 truncate font-medium">
                  {Array.isArray(record.prescriptionId?.medicalSupplies)
                    ? record.prescriptionId.medicalSupplies
                        .slice(0, 2)
                        .join(", ")
                    : "View Prescription"}
                </p>
              </div>
            )}

            {record.billId && (
              <div className="group p-3.5 bg-linear-to-r from-blue-50/80 to-indigo-50/80 border border-blue-200 rounded-xl hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <Receipt className="size-4.5 text-blue-600" />
                  <span className="font-bold text-blue-800 text-sm">Bill</span>
                </div>
                <p className="text-sm text-blue-700 font-semibold">
                  ₹{record.billId?.amount?.toLocaleString() || "View"}
                </p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="border-t border-(--color-border)/50 pt-4 flex gap-2">
            <button className="flex-1 bg-linear-to-r from-(--color-primary) to-(--color-primary-dark) hover:from-(--color-primary-dark) hover:to-(--color-primary) text-(--color-light-primary-bg) font-bold py-3 px-5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 text-base">
              <Eye className="size-5" />
              View
            </button>
            <button className="px-5 py-3 bg-(--color-light-primary-bg)/50 hover:bg-(--color-light-primary-bg) border border-(--color-border) text-(--color-text) font-semibold rounded-xl hover:border-(--color-primary) hover:text-(--color-primary) transition-all duration-300 flex items-center justify-center gap-2 text-base">
              <Download className="size-5" />
              PDF
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorMedicalRecordCard;
