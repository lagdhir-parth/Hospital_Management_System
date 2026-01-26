import React, { useEffect, useState, useMemo } from "react";
import api from "../../../api/axios";
import AdminPatientCard from "./AdminPatientCard";
import { Users, Search, Filter, Trash2, UserCheck } from "lucide-react";

const AdminUserManagement = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    bloodGroup: "all",
    gender: "all",
  });
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await api.get("/patients/allPatients");
        setPatients(response.data.data || []);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = useMemo(() => {
    return patients
      .filter((patient) => {
        const matchesSearch =
          !filters.search ||
          patient.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          patient.username
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          patient.email.toLowerCase().includes(filters.search.toLowerCase());

        const matchesBloodGroup =
          filters.bloodGroup === "all" ||
          patient.bloodGroup === filters.bloodGroup;
        const matchesGender =
          filters.gender === "all" || patient.gender === filters.gender;

        return matchesSearch && matchesBloodGroup && matchesGender;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [patients, filters]);

  const stats = {
    total: patients.length,
    active: patients.filter((p) => !p.isDeleted).length,
    recent: patients.filter(
      (p) =>
        new Date(p.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    ).length,
  };

  const handleDeletePatient = async (patientId) => {
    if (
      !confirm(`Delete "${patients.find((p) => p._id === patientId)?.name}"?`)
    )
      return;

    try {
      setDeletingId(patientId);
      await api.delete(`/admins/deleteUser/patient/${patientId}`);
      setPatients((prev) => prev.filter((p) => p._id !== patientId));
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-(--color-primary) mx-auto mb-4"></div>
          <p className="text-xl text-(--color-text-muted)">
            Loading patients...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border border-(--color-border) rounded-2xl bg-(--color-surface) shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div>
            <h1 className="text-3xl font-black bg-linear-to-r from-(--color-primary) to-(--color-primary-dark) bg-clip-text text-transparent mb-1">
              Patient Management
            </h1>
            <p className="text-lg text-(--color-text-muted)">
              {filteredPatients.length} patients
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 flex-none">
            <div className="p-4 rounded-xl bg-linear-to-br from-(--color-primary)/5 text-center hover:shadow-lg transition-all">
              <div className="text-2xl font-black text-(--color-primary)">
                {stats.total}
              </div>
              <div className="text-sm text-(--color-text-muted)">Total</div>
            </div>
            <div className="p-4 rounded-xl bg-linear-to-br from-green-500/10 text-center hover:shadow-lg transition-all">
              <div className="text-2xl font-black text-green-600">
                {stats.active}
              </div>
              <div className="text-sm text-(--color-text-muted)">Active</div>
            </div>
            <div className="p-4 rounded-xl bg-linear-to-br from-blue-500/10 text-center hover:shadow-lg transition-all">
              <div className="text-2xl font-black text-blue-600">
                {stats.recent}
              </div>
              <div className="text-sm text-(--color-text-muted)">New (30d)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border border-(--color-border) rounded-2xl bg-(--color-surface) shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search name, username, email..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="w-full pl-12 pr-4 py-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary)/20 focus:border-(--color-primary) transition-all text-base placeholder-(--color-text-muted)"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <select
              value={filters.bloodGroup}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, bloodGroup: e.target.value }))
              }
              className="px-4 py-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary)/20 focus:border-(--color-primary) transition-all text-base min-w-[140px]"
            >
              <option value="all">All Blood Groups</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>

            <select
              value={filters.gender}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, gender: e.target.value }))
              }
              className="px-4 py-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary)/20 focus:border-(--color-primary) transition-all text-base min-w-[120px]"
            >
              <option value="all">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patients */}
      <AdminPatientCard
        patients={filteredPatients}
        onDeletePatient={handleDeletePatient}
        deletingId={deletingId}
      />
    </div>
  );
};

export default AdminUserManagement;
