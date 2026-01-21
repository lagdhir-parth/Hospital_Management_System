import React, { useEffect, useState, useMemo } from "react";
import api from "../../../api/axios";
import DoctorMedicalRecordCard from "./DoctorMedicalRecordCard";
import { FileText, Filter, Search, User } from "lucide-react";

const DoctorMedicalHistory = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    patientSearch: "",
    dateRange: "all",
  });

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        setLoading(true);
        const res = await api.get("/medicalRecords/userRecords"); // Updated endpoint
        setMedicalRecords(res.data.data || []);
      } catch (error) {
        console.error("Error fetching medical history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicalHistory();
  }, []);

  // Filter records
  const filteredRecords = useMemo(() => {
    return medicalRecords
      .filter((record) => {
        const matchesSearch =
          !filters.patientSearch ||
          record.patientId?.name
            ?.toLowerCase()
            .includes(filters.patientSearch.toLowerCase());

        // Date filter logic
        const matchesDate =
          filters.dateRange === "all" ||
          (filters.dateRange === "recent" &&
            record.createdAt >
              new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
          (filters.dateRange === "this-month" &&
            new Date(record.createdAt).getMonth() === new Date().getMonth());

        return matchesSearch && matchesDate;
      })
      .sort(
        (a, b) =>
          new Date(b.appointmentId.dateTime) -
          new Date(a.appointmentId.dateTime),
      );
  }, [medicalRecords, filters]);

  const stats = {
    total: medicalRecords.length,
    withPrescription: medicalRecords.filter((r) => r.prescriptionId).length,
    withBill: medicalRecords.filter((r) => r.billId).length,
    completed: medicalRecords.filter(
      (r) => r.appointmentId.status === "Completed",
    ).length,
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-(--color-primary) mx-auto mb-4"></div>
          <p className="text-(--color-text-muted)">
            Loading medical records...
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
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
            <div className="p-6 rounded-2xl bg-linear-to-br from-(--color-primary)/5 to-(--color-primary-light)/5 text-center hover:shadow-xl transition-all">
              <div className="text-3xl font-black text-(--color-primary)">
                {stats.total}
              </div>
              <div className="text-sm font-medium text-(--color-text-muted)">
                Total Records
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-linear-to-br from-green-500/10 to-emerald-500/10 text-center hover:shadow-xl transition-all">
              <div className="text-3xl font-black text-green-600">
                {stats.withPrescription}
              </div>
              <div className="text-sm font-medium text-(--color-text-muted)">
                With Prescription
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-linear-to-br from-blue-500/10 to-blue-600/10 text-center hover:shadow-xl transition-all">
              <div className="text-3xl font-black text-blue-600">
                {stats.withBill}
              </div>
              <div className="text-sm font-medium text-(--color-text-muted)">
                Billed
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-linear-to-br from-purple-500/10 to-purple-600/10 text-center hover:shadow-xl transition-all">
              <div className="text-3xl font-black text-purple-600">
                {stats.completed}
              </div>
              <div className="text-sm font-medium text-(--color-text-muted)">
                Completed Visits
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-(--color-text-muted)" />
              <input
                type="text"
                placeholder="Search by patient name..."
                value={filters.patientSearch}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    patientSearch: e.target.value,
                  }))
                }
                className="w-full pl-12 pr-4 py-4 border border-(--color-border) rounded-2xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) focus:border-transparent transition-all text-(--color-text) placeholder-(--color-text-muted)"
              />
            </div>
            <select
              value={filters.dateRange}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, dateRange: e.target.value }))
              }
              className="px-6 py-4 border border-(--color-border) rounded-2xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary) focus:border-transparent transition-all text-(--color-text)"
            >
              <option value="all">All Time</option>
              <option value="recent">Last 30 Days</option>
              <option value="this-month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="text-center mb-12">
        <p className="text-3xl font-bold text-(--color-text) leading-tight">
          {filteredRecords.length} Medical Records
        </p>
      </div>

      <DoctorMedicalRecordCard records={filteredRecords} />
    </div>
  );
};

export default DoctorMedicalHistory;
