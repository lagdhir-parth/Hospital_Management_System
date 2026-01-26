import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { X, Upload } from "lucide-react";
import CustomDropdown from "../../CustomDropdown";

const DoctorRegistrationModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    age: "",
    gender: "Male",
    specialization: "",
    qualifications: "",
    yearsOfExperience: "",
    mobileNumber: "",
    consultationFee: "",
    departmentName: "",
    description: "",
    availability: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/departments/allDepartments");
      setDepartments(res.data.data || []);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchDepartments();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      formDataToSend.append(key, value),
    );
    if (profilePic) formDataToSend.append("profilePic", profilePic);

    try {
      await api.post("/doctors/register", formDataToSend);
      onSuccess();
      onClose();
    } catch (error) {
      alert("Error: " + error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-(--color-surface) border border-(--color-border) rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-(--color-surface) border-b border-(--color-border) p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-(--color-text)">
              Add Doctor
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-(--color-light-primary-bg) rounded-xl"
            >
              <X className="size-5 text-(--color-text-muted)" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Full Name *"
              value={formData.name}
              onChange={(e) =>
                setFormData((p) => ({ ...p, name: e.target.value }))
              }
              className="p-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) w-full"
              required
            />
            <input
              placeholder="Username *"
              value={formData.username}
              onChange={(e) =>
                setFormData((p) => ({ ...p, username: e.target.value }))
              }
              className="p-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) w-full"
              required
            />
            <input
              type="email"
              placeholder="Email *"
              value={formData.email}
              onChange={(e) =>
                setFormData((p) => ({ ...p, email: e.target.value }))
              }
              className="p-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) w-full"
              required
            />
            <input
              type="password"
              placeholder="Password *"
              value={formData.password}
              onChange={(e) =>
                setFormData((p) => ({ ...p, password: e.target.value }))
              }
              className="p-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) w-full"
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={(e) =>
                setFormData((p) => ({ ...p, age: e.target.value }))
              }
              className="p-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) w-full"
              required
            />
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData((p) => ({ ...p, gender: e.target.value }))
              }
              className="p-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) w-full"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Specialization *"
              value={formData.specialization}
              onChange={(e) =>
                setFormData((p) => ({ ...p, specialization: e.target.value }))
              }
              className="p-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) w-full"
              required
            />
            <input
              placeholder="Qualifications (comma)"
              value={formData.qualifications}
              onChange={(e) =>
                setFormData((p) => ({ ...p, qualifications: e.target.value }))
              }
              className="p-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) w-full"
            />
            <input
              type="number"
              placeholder="Experience (years)"
              value={formData.yearsOfExperience}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  yearsOfExperience: e.target.value,
                }))
              }
              className="p-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) w-full"
              required
            />
            <input
              type="number"
              placeholder="Consult Fee (₹)"
              value={formData.consultationFee}
              onChange={(e) =>
                setFormData((p) => ({ ...p, consultationFee: e.target.value }))
              }
              className="p-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) w-full"
              required
            />
            <input
              placeholder="Mobile Number"
              value={formData.mobileNumber}
              onChange={(e) =>
                setFormData((p) => ({ ...p, mobileNumber: e.target.value }))
              }
              className="p-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) w-full"
            />
            <select
              value={formData.departmentName}
              onChange={(e) =>
                setFormData((p) => ({ ...p, departmentName: e.target.value }))
              }
              className="p-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) w-full"
              required
            >
              <option value="">Select Department *</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block-flex text-xs font-bold text-(--color-text-muted) mb-2 items-center gap-1.5">
                Profile Photo <Upload className="size-3" />
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePic(e.target.files[0])}
                className="w-full p-3 border-2 border-dashed border-(--color-border) rounded-xl bg-(--color-light-primary-bg)/50 hover:border-(--color-primary) transition-all file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-(--color-primary)/90 file:text-white hover:file:bg-(--color-primary)"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-(--color-text-muted) mb-2">
                Availability (comma)
              </label>
              <input
                placeholder="Mon,Wed,Fri"
                value={formData.availability}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, availability: e.target.value }))
                }
                className="p-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-(--color-text-muted) mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData((p) => ({ ...p, description: e.target.value }))
              }
              className="w-full p-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) resize-vertical"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-linear-to-r from-(--color-primary) to-(--color-primary-dark) hover:from-(--color-primary-dark) hover:to-(--color-primary) text-white font-bold py-3 px-6 rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all text-base disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Doctor"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-(--color-light-primary-bg)/50 hover:bg-(--color-light-primary-bg) border border-(--color-border) text-(--color-text) font-semibold py-3 px-6 rounded-xl hover:border-(--color-primary) hover:text-(--color-primary) transition-all text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegistrationModal;
