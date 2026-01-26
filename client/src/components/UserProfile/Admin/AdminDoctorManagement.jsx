import React, { useEffect, useState, useMemo } from "react";
import api from "../../../api/axios";
import AdminDoctorCard from "./AdminDoctorCard";
import DoctorRegistrationModal from "./DoctorRegistrationModal";
import { Users, Search, Filter, Plus } from "lucide-react";

const AdminDoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    department: "all",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await api.get("/doctors/allDoctors");
      setDoctors(response.data.data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        !filters.search ||
        doctor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        doctor.username.toLowerCase().includes(filters.search.toLowerCase());

      return matchesSearch;
    });
  }, [doctors, filters]);

  const stats = {
    total: doctors.length,
    active: doctors.filter((d) => d.isActive).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-(--color-primary)"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border border-(--color-border) rounded-2xl bg-(--color-surface) shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div>
            <h1 className="text-2xl font-black bg-linear-to-r from-(--color-primary) to-(--color-primary-dark) bg-clip-text text-transparent">
              Doctors ({filteredDoctors.length})
            </h1>
          </div>

          <div className="flex gap-3 items-center flex-wrap">
            <div className="grid grid-cols-2 gap-3 items-center text-center p-3 rounded-xl bg-linear-to-br from-(--color-primary)/5">
              <div className="text-xl font-black text-(--color-primary)">
                {stats.total}
              </div>
              <div className="text-xs text-(--color-text-muted)">Total</div>
            </div>

            <button
              onClick={() => setShowRegisterModal(true)}
              className="px-6 py-3 bg-linear-to-r from-(--color-primary) to-(--color-primary-dark) text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 text-sm whitespace-nowrap"
            >
              <Plus className="size-4" />
              Add Doctor
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border border-(--color-border) rounded-2xl bg-(--color-surface) shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="w-full pl-12 pr-4 py-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary)/20 focus:border-(--color-primary) transition-all text-sm"
            />
          </div>
        </div>
      </div>

      <AdminDoctorCard
        doctors={filteredDoctors}
        refreshDoctors={fetchDoctors}
      />
      <DoctorRegistrationModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSuccess={fetchDoctors}
      />
    </div>
  );
};

export default AdminDoctorManagement;
