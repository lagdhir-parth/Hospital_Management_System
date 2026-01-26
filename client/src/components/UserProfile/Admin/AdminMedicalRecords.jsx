import React, { useEffect, useState, useMemo } from "react";
import api from "../../../api/axios";
import AdminRecordCard from "./AdminRecordCard";
import { Search, FileText, Filter } from "lucide-react";

const AdminMedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await api.get("/medicalRecords/allMedicalRecords");
      setRecords(response.data.data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = useMemo(() => {
    if (!search) return records;
    return records.filter(
      (record) =>
        record.patientId?.name?.toLowerCase().includes(search.toLowerCase()) ||
        record.doctorId?.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [records, search]);

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
            <h1 className="text-2xl font-black text-(--color-text)">
              Medical Records ({filteredRecords.length})
            </h1>
          </div>

          <div className="flex gap-3 flex-wrap">
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-linear-to-br from-(--color-primary)/5 text-center">
              <div className="text-xl font-black text-(--color-primary)">
                {records.length}
              </div>
              <div className="text-xs text-(--color-text-muted)">Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="border border-(--color-border) rounded-2xl bg-(--color-surface) shadow-lg p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-(--color-text-muted)" />
          <input
            type="text"
            placeholder="Search patient or doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary)/20 focus:border-(--color-primary) transition-all text-sm placeholder-(--color-text-muted)"
          />
        </div>
      </div>

      <AdminRecordCard
        records={filteredRecords}
        refreshRecords={fetchRecords}
      />
    </div>
  );
};

export default AdminMedicalRecords;
