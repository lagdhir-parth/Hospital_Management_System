import React, { useState, useEffect } from "react";
import api from "../../../api/axios";
import { X, Building2 } from "lucide-react";

const DepartmentModal = ({ isOpen, onClose, onSuccess, editingDept }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    headOfDepartmentUsername: "",
    location: "",
    contactNumber: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && editingDept) {
      setFormData({
        name: editingDept.name,
        description: editingDept.description,
        headOfDepartmentUsername: editingDept.headOfDepartment?.username || "",
        location: editingDept.location,
        contactNumber: editingDept.contactNumber || "",
      });
    } else if (isOpen) {
      setFormData({
        name: "",
        description: "",
        headOfDepartmentUsername: "",
        location: "",
        contactNumber: "",
      });
    }
  }, [isOpen, editingDept]);

  useEffect(() => {
    fetchDoctors();
  }, [isOpen]);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors/allDoctors");
      setDoctors(res.data.data || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingDept) {
        await api.put(`/departments/${editingDept._id}`, formData);
      } else {
        await api.post("/departments/create", formData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-(--color-surface) border border-(--color-border) rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-(--color-surface) border-b border-(--color-border) p-5 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-(--color-text)">
              {editingDept ? "Edit Department" : "New Department"}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-(--color-light-primary-bg) rounded-lg"
            >
              <X className="size-4 text-(--color-text-muted)" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input
            placeholder="Department Name *"
            value={formData.name}
            onChange={(e) =>
              setFormData((p) => ({ ...p, name: e.target.value }))
            }
            className="w-full p-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) text-sm"
            required
          />

          <textarea
            placeholder="Description *"
            value={formData.description}
            onChange={(e) =>
              setFormData((p) => ({ ...p, description: e.target.value }))
            }
            rows={3}
            className="w-full p-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) resize-vertical text-sm"
            required
          />

          <input
            placeholder="Location *"
            value={formData.location}
            onChange={(e) =>
              setFormData((p) => ({ ...p, location: e.target.value }))
            }
            className="w-full p-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) text-sm"
            required
          />

          <input
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={(e) =>
              setFormData((p) => ({ ...p, contactNumber: e.target.value }))
            }
            className="w-full p-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) text-sm"
          />

          <select
            value={formData.headOfDepartmentUsername}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                headOfDepartmentUsername: e.target.value,
              }))
            }
            className="w-full p-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) text-sm"
          >
            <option value="">No HOD</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor.username}>
                {doctor.name} ({doctor.specialization})
              </option>
            ))}
          </select>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-linear-to-r from-(--color-primary) to-(--color-primary-dark) hover:from-(--color-primary-dark) hover:to-(--color-primary) text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm disabled:opacity-60"
            >
              {loading ? "Saving..." : editingDept ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-(--color-light-primary-bg)/50 hover:bg-(--color-light-primary-bg) border border-(--color-border) text-(--color-text) font-semibold py-3 px-6 rounded-xl hover:border-(--color-primary) hover:text-(--color-primary) transition-all text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentModal;
