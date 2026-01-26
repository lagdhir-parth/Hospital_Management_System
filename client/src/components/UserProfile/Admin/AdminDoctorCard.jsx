import React from "react";
import {
  User,
  Stethoscope,
  Phone,
  Mail,
  DollarSign,
  CalendarDays,
} from "lucide-react";

const AdminDoctorCard = ({ doctors = [], refreshDoctors }) => {
  if (!doctors.length) {
    return (
      <div className="col-span-full text-center py-20">
        <Stethoscope className="size-20 mx-auto mb-6 text-(--color-text-muted) opacity-50" />
        <h3 className="text-2xl font-bold text-(--color-text)">No Doctors</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {doctors.map((doctor) => (
        <div
          key={doctor._id}
          className="group bg-(--color-surface) border border-(--color-border) rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all  mt-10"
        >
          {/* Header */}
          <div className="relative p-6 pt-12 pb-4 border-b border-(--color-border)/50 text-center">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 size-20 rounded-2xl ring-4 ring-(--color-primary-light) shadow-lg group-hover:scale-105 transition-all bg-linear-to-br from-(--color-primary)/15 to-(--color-primary-dark)/15">
              <img
                src={
                  doctor.profilePic || import.meta.env.VITE_USERPLACEHOLDERIMG
                }
                alt={doctor.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            <h3 className="font-black text-xl text-(--color-text) my-2 truncate">
              Dr. {doctor.name}
            </h3>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-(--color-primary)/10 text-(--color-primary) font-bold rounded-xl text-sm">
              <Stethoscope className="size-4" />
              {doctor.specialization}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 space-y-4">
            {/* Contact */}
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 p-3 bg-blue-50 border border-blue-200 rounded-xl hover:shadow-sm">
                <Phone className="size-4.5 text-blue-600" />
                <span className="text-base font-semibold text-(--color-text) truncate">
                  {doctor.mobileNumber}
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-emerald-50 border border-emerald-200 rounded-xl hover:shadow-sm">
                <Mail className="size-4.5 text-emerald-600" />
                <span className="text-sm font-medium text-(--color-text) truncate">
                  {doctor.email}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center p-3 bg-purple-50 border border-purple-200 rounded-xl">
                <DollarSign className="size-5 text-purple-600 mb-1.5" />
                <span className="font-bold text-lg text-purple-800">
                  ₹{doctor.consultationFee}
                </span>
                <span className="text-xs text-purple-700">Fee</span>
              </div>

              <div className="flex flex-col items-center p-3 bg-green-50 border border-green-200 rounded-xl">
                <CalendarDays className="size-5 text-green-600 mb-1.5" />
                <span className="font-bold text-lg text-green-800">
                  {doctor.yearsOfExperience}
                </span>
                <span className="text-xs text-green-700">Years</span>
              </div>
            </div>

            {/* Department */}
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Stethoscope className="size-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-base text-(--color-text) truncate">
                    {doctor.department?.name}
                  </p>
                  <p className="text-xs text-(--color-text-muted) truncate">
                    {doctor.availability?.slice(0, 2).join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 pt-4 border-t border-(--color-border)/50">
            <div className="flex gap-2">
              <button className="flex-1 bg-linear-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm">
                Activate
              </button>
              <button className="px-4 py-2.5 bg-linear-to-r from-(--color-primary) to-(--color-primary-dark) hover:from-(--color-primary-dark) hover:to-(--color-primary) text-(--color-light-primary-bg) font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm flex-1">
                View
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDoctorCard;
