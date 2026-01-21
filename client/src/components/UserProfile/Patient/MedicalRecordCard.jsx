import React from "react";
import {
  FileText,
  User,
  Calendar,
  Stethoscope,
  Pill,
  Receipt,
  Clock,
  AlertTriangle,
} from "lucide-react";

const statusColors = {
  Requested: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Scheduled: "bg-blue-100 text-blue-800 border-blue-200",
  Completed: "bg-green-100 text-green-800 border-green-200",
  Cancelled: "bg-red-100 text-red-800 border-red-200",
  "No-Show": "bg-gray-100 text-gray-800 border-gray-200",
};

const statusIcons = {
  Requested: Clock,
  Scheduled: Calendar,
  Completed: FileText,
  Cancelled: AlertTriangle,
  "No-Show": Clock,
};

const MedicalRecordCard = ({ medicalRecords = [] }) => {
  if (!medicalRecords.length) {
    return (
      <div className="text-center py-16 text-(--color-text-muted)">
        <FileText className="size-16 mx-auto mb-4 opacity-50" />
        <h3 className="text-xl font-semibold mb-2">No medical records yet</h3>
        <p>Your medical history will appear here after visits</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {medicalRecords.map((record) => (
        <div
          key={record._id}
          className="relative border border-(--color-border) rounded-2xl bg-(--color-surface) shadow-lg p-6 hover:shadow-xl transition-all duration-300 group"
        >
          {/* Timeline connector dot */}
          <div className="absolute -left-3 top-8 w-1.5 h-1.5 bg-(--color-primary) rounded-full ring-4 ring-(--color-surface)" />

          {/* Header: Doctor + Date + Appointment Status */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="size-12 rounded-full bg-(--color-primary)/10 flex items-center justify-center">
                <User className="size-6 text-(--color-primary)" />
              </div>
              <div>
                <h3 className="font-bold text-(--color-text) text-xl">
                  {record.doctorId?.name || "Dr. Unknown"}
                </h3>
                <p className="text-sm text-(--color-text-muted)">
                  {record.doctorId?.specialization || "Specialist"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div className="flex items-center gap-1 text-sm text-(--color-text-muted)">
                <Calendar className="size-4" />
                {new Intl.DateTimeFormat("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  timeZone: "UTC", // UTC timezone
                }).format(
                  new Date(record.appointmentId?.dateTime || record.createdAt),
                )}
              </div>
              {record.appointmentId?.status && (
                <div
                  className={`flex items-center gap-1 px-3 py-1.5 bg-(--color-primary)/10 text-(--color-primary)  rounded-full text-sm font-medium ${
                    statusColors[record.appointmentId.status] ||
                    "bg-gray-100 text-gray-800 border-gray-200"
                  }`}
                >
                  {React.createElement(
                    statusIcons[record.appointmentId.status],
                    { className: "size-4" },
                  )}
                  {record.appointmentId.status}
                </div>
              )}
            </div>
          </div>

          {/* Core Record Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Appointment Details */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <div className="p-4 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg)/50 hover:bg-(--color-primary)/5 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Stethoscope className="size-5 text-(--color-primary)" />
                  <h4 className="font-semibold text-(--color-text)">
                    Visit Details
                  </h4>
                </div>
                <p className="text-sm text-(--color-text-muted)">
                  {record.appointmentId?.reason || "Consultation"}
                </p>
                {record.appointmentId?.diseases && (
                  <p className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded mt-2">
                    {record.appointmentId.diseases}
                  </p>
                )}
              </div>
            </div>

            {/* Prescription Link */}
            {record.prescriptionId && (
              <div className="p-4 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg)/50 hover:bg-(--color-primary)/5 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Pill className="size-5 text-blue-500" />
                  <span className="font-semibold text-(--color-text) text-sm">
                    Prescription
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-(--color-text-muted)">
                    Medical supplies:
                    {record.prescriptionId?.medicalSupplies.map(
                      (supply, index) => (
                        <span key={index} className="ml-1">
                          {supply},
                        </span>
                      ),
                    )}
                  </p>
                  <p className="text-xs text-(--color-text-muted)">
                    instructions: {record.prescriptionId?.instructions}
                  </p>
                  <p className="text-xs text-(--color-text-muted)">
                    notes: {record.prescriptionId?.notes}
                  </p>
                </div>
              </div>
            )}

            {/* Bill Link */}
            {record.billId && (
              <div
                className={`p-4 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg)/50 hover:bg-(--color-primary)/5 transition-colors`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Receipt className="size-5 text-green-500" />
                  <span className="font-semibold text-(--color-text) text-sm">
                    Bill
                  </span>
                  {record.billId.paymentStatus === "Paid" ? (
                    <span className="ml-auto px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                      Paid
                    </span>
                  ) : (
                    <span className="ml-auto px-2 py-0.5 bg-red-100 text-red-800 border-red-200 text-xs rounded-full">
                      Unpaid
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium text-(--color-text)">
                  ₹{record.billId.amount || "Pending"}
                </p>
              </div>
            )}
          </div>

          {/* Footer: Record Date */}
          <div className="pt-4 border-t border-(--color-border) text-xs text-(--color-text-muted) flex items-center gap-2">
            <Clock className="size-3" />
            Record created{" "}
            {new Intl.DateTimeFormat("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
              timeZone: "UTC", // UTC timezone
            }).format(new Date(record.createdAt))}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-(--color-primary)/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
      ))}
    </div>
  );
};

export default MedicalRecordCard;
