import React from "react";
import {
  User,
  Phone,
  Mail,
  Droplets,
  AlertTriangle,
  Pill,
  HeartPulse,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TreatedPatientCard = ({ patients = [] }) => {
  const navigate = useNavigate();

  if (!patients.length) {
    return (
      <div className="col-span-full text-center py-24 px-8">
        <User className="size-28 mx-auto mb-8 text-(--color-text-muted) opacity-40" />
        <h3 className="text-4xl font-black text-(--color-text) mb-6 bg-linear-to-r from-(--color-primary)/20 bg-clip-text">
          No Patients Found
        </h3>
        <p className="text-xl text-(--color-text-muted) max-w-2xl mx-auto leading-relaxed">
          No patients match your current search or filter criteria. Try
          broadening your search or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
      {patients.map((patient, index) => (
        <article
          key={patient._id}
          className="group relative bg-(--color-surface) border border-(--color-border) rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:border-(--color-primary)/50 transition-all duration-400  h-full cursor-pointer"
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-(--color-primary)/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Avatar Section */}
          <div className="relative z-10 p-6 pt-12 pb-6 border-b border-(--color-border)/30 text-center">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 transform size-24 rounded-3xl bg-linear-to-br from-(--color-primary) to-(--color-primary-dark) border-4 border-(--color-surface)  group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
              <User className="size-12 text-(--color-light-primary-bg) drop-shadow-lg" />
            </div>

            <h3 className="font-black text-2xl bg-linear-to-r from-(--color-text) to-(--color-text-dark) bg-clip-text text-transparent mt-4 mb-2 truncate">
              {patient.name}
            </h3>
            <p className="text-base font-semibold text-(--color-primary) bg-(--color-primary)/10 px-3 py-1 rounded-full inline-block">
              @{patient.username}
            </p>
          </div>

          {/* Contact Info */}
          <div className="relative z-10 px-6 py-5 space-y-3 mb-auto">
            <div className="flex items-center gap-3 p-3.5 bg-linear-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl hover:shadow-md transition-all group-hover:bg-blue-100">
              <Phone className="size-5 text-blue-600 shrink-0" />
              <span className="text-lg font-semibold text-(--color-text) truncate flex-1">
                {patient.mobile_no}
              </span>
            </div>

            <div className="flex items-center gap-3 p-3.5 bg-linear-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl hover:shadow-md transition-all group-hover:bg-emerald-100">
              <Mail className="size-5 text-emerald-600 shrink-0" />
              <span className="text-base text-(--color-text) truncate flex-1">
                {patient.email}
              </span>
            </div>
          </div>

          {/* Medical Snapshot */}
          <div className="relative z-10 px-6 pb-6 space-y-3">
            {/* Blood Group + Age */}
            <div className="flex items-center justify-between p-4 bg-linear-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl hover:shadow-md transition-all">
              <div className="flex items-center gap-2.5">
                <Droplets className="size-5 text-purple-600" />
                <div>
                  <p className="text-sm font-bold text-purple-800">
                    {patient.bloodGroup}
                  </p>
                  <p className="text-xs text-purple-700 font-medium">
                    {patient.gender}, {patient.age}y
                  </p>
                </div>
              </div>
            </div>

            {/* Diagnoses */}
            {patient.diagnoses?.length > 0 && (
              <div className="p-4 bg-linear-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl hover:shadow-md transition-all group-hover:shadow-lg">
                <div className="flex items-center gap-2.5 mb-1">
                  <AlertTriangle className="size-5 text-red-500" />
                  <span className="font-bold text-lg text-red-800">
                    {patient.diagnoses.length}
                  </span>
                </div>
                <p className="text-sm text-red-700 font-medium line-clamp-1">
                  {patient.diagnoses.slice(0, 3).join(", ")}
                  {patient.diagnoses.length > 3 && "..."}
                </p>
              </div>
            )}

            {/* Allergies */}
            {patient.allergies?.length > 0 && (
              <div className="p-4 bg-linear-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl hover:shadow-md transition-all group-hover:shadow-lg">
                <div className="flex items-center gap-2.5 mb-1">
                  <Pill className="size-5 text-orange-500" />
                  <span className="font-bold text-lg text-orange-800">
                    {patient.allergies.length}
                  </span>
                </div>
                <p className="text-sm text-orange-700 font-medium line-clamp-1">
                  {patient.allergies.slice(0, 3).join(", ")}
                  {patient.allergies.length > 3 && "..."}
                </p>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="px-6 pb-6 pt-4 border-t border-(--color-border)/50">
            <button
              onClick={() => navigate("/profile/doctor/medical-history")}
              className="w-full bg-linear-to-r from-(--color-primary) to-(--color-primary-dark) hover:from-(--color-primary-dark) hover:to-(--color-primary) text-(--color-light-primary-bg) font-black py-4 px-6 rounded-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-400 flex items-center justify-center gap-3 text-lg tracking-wide"
            >
              <HeartPulse className="size-6 animate-pulse" />
              View Medical History
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};
export default TreatedPatientCard;
