import React, { useEffect, useState, useMemo } from "react";
import api from "../../../api/axios";
import AdminDeptCard from "./AdminDeptCard";
import DepartmentModal from "./DepartmentModal";
import { Search, Plus } from "lucide-react";

const AdminDepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [editingDept, setEditingDept] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/departments/allDepartments");
      setDepartments(res.data.data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDepts = useMemo(() => {
    return departments.filter(
      (dept) =>
        dept.name.toLowerCase().includes(search.toLowerCase()) ||
        dept.description.toLowerCase().includes(search.toLowerCase()),
    );
  }, [departments, search]);

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
              Departments ({filteredDepts.length})
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setEditingDept(null);
                setShowModal(true);
              }}
              className="px-6 py-3 bg-linear-to-r from-(--color-primary) to-(--color-primary-dark) text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm flex items-center gap-2"
            >
              <Plus className="size-4" />
              Add Dept
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="border border-(--color-border) rounded-2xl bg-(--color-surface) shadow-lg p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-(--color-text-muted)" />
          <input
            type="text"
            placeholder="Search departments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-(--color-border) rounded-xl bg-(--color-light-primary-bg) focus:ring-2 focus:ring-(--color-primary)/20 focus:border-(--color-primary) transition-all text-sm"
          />
        </div>
      </div>

      <AdminDeptCard
        departments={filteredDepts}
        refreshDepts={fetchDepartments}
        onEditDept={setEditingDept}
        setShowModal={setShowModal}
      />

      <DepartmentModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingDept(null);
        }}
        onSuccess={fetchDepartments}
        editingDept={editingDept}
      />
    </div>
  );
};

export default AdminDepartmentManagement;
