import React from "react";
import {
  Clock,
  Calendar,
  User,
  Stethoscope,
  MapPin,
  AlertCircle,
  Building2,
} from "lucide-react";

const statusColors = {
  Requested: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Scheduled: "bg-blue-100 text-blue-800 border-blue-200",
  Completed: "bg-green-100 text-green-800 border-green-200",
  Cancelled: "bg-red-100 text-red-800 border-red-200",
  "No-Show": "bg-gray-100 text-gray-800 border-gray-200",
};

const AppointmentCard = ({ appointments = [] }) => {
  if (!appointments.length) {
    return (
      <div className="text-center py-16 text-(--color-text-muted)">
        <Clock className="size-16 mx-auto mb-4 opacity-50" />
        <h3 className="text-xl font-semibold mb-2">No appointments yet</h3>
        <p>Book your first appointment to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {appointments.map((appt) => (
        <div
          key={appt._id}
          className="border border-(--color-border) rounded-2xl bg-(--color-surface) shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col h-full group"
        >
          {/* Header: Date/Time + Status */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-(--color-primary)" />
              <div>
                {/* ✅ UTC Date */}
                <p className="font-semibold text-(--color-text) text-lg">
                  {new Intl.DateTimeFormat("en-IN", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    timeZone: "UTC", // UTC timezone
                  }).format(new Date(appt.dateTime))}
                </p>

                {/* ✅ UTC Time */}
                <p className="text-sm text-(--color-text-muted)">
                  {new Intl.DateTimeFormat("en-IN", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true, // 12hr format
                    timeZone: "UTC", // UTC timezone
                  }).format(new Date(appt.dateTime))}
                </p>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${
                statusColors[appt.status] ||
                "bg-gray-100 text-gray-800 border-gray-200"
              }`}
            >
              {appt.status}
            </span>
          </div>

          {/* Doctor + Department */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <Stethoscope className="size-5 text-(--color-primary)" />
              <h3 className="font-bold text-(--color-text) text-lg">
                {appt.doctorId?.name || "Doctor Name"}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-(--color-text-muted)">
              <Building2 className="size-4" />
              <span>Dept: {appt.departmentId?.name || "Department"}</span>
            </div>
          </div>

          {/* Reason + Diseases */}
          <div className="space-y-3 flex-1">
            <div>
              <p className="flex items-center gap-2 mb-1 text-sm font-semibold text-(--color-text-muted)">
                <MapPin className="size-4" />
                Reason for visit
              </p>
              <p className="text-(--color-text) leading-relaxed">
                {appt.reason}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2 mb-1 text-sm font-semibold text-(--color-text-muted)">
                <AlertCircle className="size-4" />
                Reported diseases
              </p>
              <p className="text-(--color-text) leading-relaxed mb-2">
                {appt.diseases}
              </p>
            </div>
          </div>

          {/* Footer: Created timestamp */}
          <div className="mt-auto pt-4 border-t border-(--color-border) text-xs text-(--color-text-muted) flex items-center gap-1">
            <Clock className="size-3" />
            Booked{" "}
            {new Date(appt.createdAt).toLocaleDateString("en-IN", {
              month: "short",
              day: "numeric",
            })}
          </div>

          {/* Hover effect: subtle lift */}
          <div className="absolute inset-0 bg-linear-to-t from-(--color-primary)/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      ))}
    </div>
  );
};

export default AppointmentCard;
