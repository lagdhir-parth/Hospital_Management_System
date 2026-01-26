import React, { useState } from "react";
import api from "../../../api/axios";
import {
  Building2,
  User,
  Phone,
  MapPin,
  Edit3,
  Trash2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const AdminDeptCard = ({
  departments = [],
  refreshDepts,
  onEditDept,
  setShowModal,
}) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (deptId) => {
    if (!confirm("Delete this department?")) return;

    try {
      setDeletingId(deptId);
      await api.delete(`/departments/delete/${deptId}`);
      refreshDepts();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (!departments.length) {
    return (
      <div className="col-span-full text-center py-20">
        <Building2 className="size-20 mx-auto mb-6 text-(--color-text-muted) opacity-50" />
        <h3 className="text-2xl font-bold text-(--color-text)">
          No Departments
        </h3>
        <p className="text-lg text-(--color-text-muted)">
          No departments found
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {departments.map((dept) => (
        <div
          key={dept._id}
          className="group bg-(--color-surface) border border-(--color-border) rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden h-full"
        >
          {/* Header */}
          {deletingId === dept._id && (
            <div className="absolute inset-0 bg-red-500/95 backdrop-blur-sm flex items-center justify-center z-20">
              <div className="text-center text-white p-4">
                <Trash2 className="size-12 mx-auto mb-3 animate-bounce" />
                <p className="text-lg font-bold">Deleting...</p>
              </div>
            </div>
          )}

          <div className="p-5 pb-4 border-b border-(--color-border)/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-12 rounded-xl bg-linear-to-br from-(--color-primary)/10 flex items-center justify-center shadow-md group-hover:scale-105">
                <Building2 className="size-6 text-(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-base text-(--color-text) truncate">
                  {dept.name}
                </h4>
                <p className="text-xs text-(--color-text-muted) line-clamp-1">
                  {dept.status === "active" ? "Active" : "Inactive"}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-(--color-text) line-clamp-2 leading-relaxed">
              {dept.description}
            </p>
          </div>

          {/* Details */}
          <div className="p-5 space-y-2.5">
            {/* HOD */}
            {dept.headOfDepartment && (
              <div className="flex items-center gap-2.5 p-3 bg-linear-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl hover:shadow-sm">
                <User className="size-4.5 text-emerald-600" />
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-(--color-text) truncate">
                    {dept.headOfDepartment.name}
                  </p>
                  <p className="text-xs text-emerald-700">
                    {dept.headOfDepartment.specialization}
                  </p>
                </div>
              </div>
            )}

            {/* Location & Contact */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 p-2.5 bg-blue-50 border border-blue-200 rounded-lg">
                <MapPin className="size-4 text-blue-600" />
                <span className="text-xs font-medium text-(--color-text) truncate">
                  {dept.location}
                </span>
              </div>

              {dept.contactNumber && (
                <div className="flex items-center gap-2 p-2.5 bg-indigo-50 border border-indigo-200 rounded-lg">
                  <Phone className="size-4 text-indigo-600" />
                  <span className="text-xs font-medium text-(--color-text)">
                    {dept.contactNumber}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="p-5 border-t border-(--color-border)/50">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onEditDept(dept);
                  setShowModal(true);
                }}
                className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-xs flex items-center justify-center gap-1.5"
              >
                <Edit3 className="size-3.5" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(dept._id)}
                disabled={deletingId === dept._id}
                className="px-3 py-2 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-xs flex items-center justify-center gap-1.5 disabled:opacity-60"
              >
                {deletingId === dept._id ? (
                  <div className="animate-spin size-3 border border-white border-t-transparent rounded-full"></div>
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

export default AdminDeptCard;
