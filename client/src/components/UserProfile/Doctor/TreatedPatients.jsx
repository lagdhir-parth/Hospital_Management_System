import React, { useEffect, useState, useMemo } from "react";
import api from "../../../api/axios";
import TreatedPatientCard from "./TreatedPatientCard";
import { Users, Search, Filter, Stethoscope } from "lucide-react";

const TreatedPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    bloodGroup: "all",
    status: "all", // treated/active
  });

  useEffect(() => {
    const fetchTreatedPatients = async () => {
      try {
        setLoading(true);
        const res = await api.get("/doctors/treatedPatients");
        setPatients(res.data.data || []);
      } catch (error) {
        console.error("Error fetching treated patients:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTreatedPatients();
  }, []);

  // Filter patients
  const filteredPatients = useMemo(() => {
    return patients
      .filter((patient) => {
        const matchesSearch =
          !filters.search ||
          patient.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          patient.username
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          "";

        const matchesBloodGroup =
          filters.bloodGroup === "all" ||
          patient.bloodGroup === filters.bloodGroup;

        return matchesSearch && matchesBloodGroup;
      })
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }, [patients, filters]);

  const stats = {
    total: patients.length,
    recent: patients.filter(
      (p) =>
        new Date(p.updatedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    ).length,
    highRisk: patients.filter(
      (p) => p.diagnoses?.length > 2 || p.allergies?.length > 1,
    ).length,
  };

  const bloodGroups = ["all", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-(--color-primary) mx-auto mb-4"></div>
          <p className="text-(--color-text-muted) text-lg">
            Loading patients...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header & Stats */}
      <div className="border border-(--color-border) rounded-3xl bg-(--color-surface) shadow-xl p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 flex-1">
            <div className="p-6 rounded-2xl bg-linear-to-br from-(--color-primary)/5 to-(--color-primary-light)/5 text-center hover:shadow-xl transition-all">
              <div className="text-3xl font-black text-(--color-primary)">
                {stats.total}
              </div>
              <div className="text-base font-medium text-(--color-text-muted)">
                Total Patients
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-linear-to-br from-emerald-500/10 to-green-500/10 text-center hover:shadow-xl transition-all">
              <div className="text-3xl font-black text-emerald-600">
                {stats.recent}
              </div>
              <div className="text-base font-medium text-(--color-text-muted)">
                Active (30d)
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-linear-to-br from-red-500/10 to-orange-500/10 text-center hover:shadow-xl transition-all">
              <div className="text-3xl font-black text-red-600">
                {stats.highRisk}
              </div>
              <div className="text-base font-medium text-(--color-text-muted)">
                High Risk
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-(--color-text-muted)" />
              <input
                type="text"
                placeholder="Search by name or username..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                className="w-full pl-12 pr-4 py-4 border border-(--color-border) rounded-2xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) focus:border-transparent transition-all text-(--color-text) placeholder-(--color-text-muted)"
              />
            </div>
            <select
              value={filters.bloodGroup}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, bloodGroup: e.target.value }))
              }
              className="px-6 py-4 border border-(--color-border) rounded-2xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) focus:border-transparent transition-all text-(--color-text)"
            >
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg === "all" ? "All Blood Groups" : bg}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="text-center mb-12">
        <p className="text-3xl font-bold text-(--color-text) leading-tight">
          {filteredPatients.length} Treated Patients
          {filters.search && (
            <span className="text-(--color-text-muted) text-xl ml-4">
              for "{filters.search}"
            </span>
          )}
        </p>
      </div>

      <TreatedPatientCard patients={filteredPatients} />
    </div>
  );
};

export default TreatedPatients;
