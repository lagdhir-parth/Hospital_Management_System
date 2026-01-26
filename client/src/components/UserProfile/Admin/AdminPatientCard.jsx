import React from "react";
import {
  User,
  Phone,
  Mail,
  Droplets,
  AlertTriangle,
  Pill,
  Trash2,
  Edit3,
} from "lucide-react";

const AdminPatientCard = ({ patients = [], onDeletePatient, deletingId }) => {
  if (!patients.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {patients.map((patient) => (
        <div
          key={patient._id}
          className="group relative bg-(--color-surface) border border-(--color-border) rounded-2xl shadow-md hover:shadow-xl hover:border-(--color-primary)/50 hover:-translate-y-1 transition-all duration-400 min-h-80 mt-10 "
        >
          {/* Delete Overlay */}
          {/* {deletingId !== patient._id && (
            <div className="absolute inset-0 bg-red-500/95 backdrop-blur-md flex items-center justify-center z-20">
              <div className="text-center text-white p-6">
                <Trash2 className="size-12 mx-auto mb-4 animate-bounce" />
                <p className="text-lg font-bold mb-1">Deleting...</p>
                <p className="text-sm opacity-90">Please wait</p>
              </div>
            </div>
          )} */}

          {/* Avatar */}
          <div className="relative flex flex-col justify-center gap-6 p-4 pb-3 border-b border-(--color-border)/40 text-center z-10">
            {/* Profile Image */}
            <div className="size-20 rounded-full mx-auto flex justify-center items-center ring-4 ring-(--color-surface) shadow-lg overflow-hidden border-4 border-(--color-surface)/50">
              <img
                src={
                  patient.profilePic || import.meta.env.VITE_USERPLACEHOLDERIMG
                }
                alt={`${patient.name}'s profile`}
                className="object-cover size-full rounded-full"
              />
            </div>

            {/* Name & Username */}
            <div className="space-y-1.5">
              <h3 className="font-black text-base bg-linear-to-r from-(--color-text) to-(--color-text-dark) bg-clip-text text-transparent truncate">
                {patient.name}
              </h3>
              <p className="text-xs font-semibold text-(--color-primary) bg-(--color-primary)/10 px-2.5 py-1 rounded-full inline-block shadow-sm">
                @{patient.username}
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="px-5 py-4 space-y-2.5 mb-auto relative z-10">
            <div className="flex items-center gap-2.5 p-3 bg-linear-to-r from-blue-50/95 to-blue-100/95 border border-blue-200/60 rounded-xl hover:shadow-sm transition-all backdrop-blur-sm">
              <Phone className="size-4.5 text-blue-600" />
              <span className="text-base font-semibold text-(--color-text) truncate">
                {patient.mobile_no}
              </span>
            </div>

            <div className="flex items-center gap-2.5 p-3 bg-linear-to-r from-emerald-50/95 to-emerald-100/95 border border-emerald-200/60 rounded-xl hover:shadow-sm transition-all backdrop-blur-sm">
              <Mail className="size-4.5 text-emerald-600" />
              <span className="text-sm font-medium text-(--color-text) truncate">
                {patient.email}
              </span>
            </div>
          </div>

          {/* Medical */}
          <div className="px-5 pb-5 space-y-2.5 relative z-10">
            <div className="grid grid-cols-2 gap-2.5">
              {/* Blood Group + Age */}
              <div className="flex flex-col items-center p-3.5 bg-linear-to-br from-purple-50/95 to-violet-50/95 border border-purple-200/60 rounded-xl hover:shadow-sm transition-all">
                <Droplets className="size-5 text-purple-600 mb-1.5" />
                <span className="font-bold text-base text-purple-800">
                  {patient.bloodGroup}
                </span>
                <span className="text-xs text-purple-700 font-medium">
                  {patient.gender}, {patient.age}y
                </span>
              </div>

              {/* Diagnoses */}
              {patient.diagnoses?.length > 0 && (
                <div className="flex flex-col items-center p-3.5 bg-linear-to-br from-red-50/95 to-rose-50/95 border border-red-200/60 rounded-xl hover:shadow-sm transition-all">
                  <AlertTriangle className="size-5 text-red-500 mb-1.5" />
                  <span className="font-bold text-base text-red-800">
                    {patient.diagnoses.length}
                  </span>
                  <span className="text-xs text-red-700 font-medium">Dx</span>
                </div>
              )}
            </div>

            {/* Allergies */}
            {patient.allergies?.length > 0 && (
              <div className="flex items-center justify-center p-3.5 bg-linear-to-br from-orange-50/95 to-amber-50/95 border border-orange-200/60 rounded-xl hover:shadow-sm transition-all mt-2.5">
                <Pill className="size-4.5 text-orange-500 mr-2 shrink-0" />
                <div>
                  <span className="font-bold text-sm text-orange-800 block">
                    {patient.allergies.length}
                  </span>
                  <span className="text-xs text-orange-700 font-medium block">
                    Allergies
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="px-5 pb-5 pt-3.5 border-t border-(--color-border)/50 relative z-10">
            {/* Delete */}
            <button
              onClick={() => onDeletePatient(patient._id)}
              disabled={deletingId === patient._id}
              className="w-full bg-linear-to-r from-red-500/90 to-red-600/90 hover:from-red-600 hover:to-red-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-1.5 text-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-md disabled:translate-y-0"
            >
              {deletingId === patient._id ? (
                <>
                  <Trash2 className="size-5 animate-bounce" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="size-5" />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPatientCard;
