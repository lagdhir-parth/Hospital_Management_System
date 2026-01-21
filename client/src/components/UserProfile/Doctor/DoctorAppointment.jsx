import React, { useEffect, useState, useMemo } from "react";
import api from "../../../api/axios";
import DoctorAppointmentCard from "./DoctorAppointmentCard";
import { Calendar, Filter, Search } from "lucide-react";

const DoctorAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          "/appointments/getDoctorSpecificAppointments",
        );
        setAppointments(response.data.data || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  // Filter appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesStatus =
        filters.status === "all" || appointment.status === filters.status;
      const matchesSearch =
        !filters.search ||
        appointment.patientId?.name
          ?.toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        appointment.reason.toLowerCase().includes(filters.search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [appointments, filters]);

  const statusOptions = [
    { value: "all", label: "All Appointments" },
    {
      value: "Requested",
      label: "Requested",
      badge: "bg-orange-100 text-orange-800",
    },
    {
      value: "Scheduled",
      label: "Scheduled",
      badge: "bg-blue-100 text-blue-800",
    },
    {
      value: "Completed",
      label: "Completed",
      badge: "bg-green-100 text-green-800",
    },
    {
      value: "Cancelled",
      label: "Cancelled",
      badge: "bg-red-100 text-red-800",
    },
    { value: "No-Show", label: "No Show", badge: "bg-gray-100 text-gray-800" },
  ];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-(--color-primary) mx-auto mb-4"></div>
          <p className="text-(--color-text-muted)">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="border border-(--color-border) rounded-3xl bg-(--color-surface) shadow-xl p-8">
        <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 flex-1 text-center">
            <div className="p-4 rounded-2xl bg-(--color-light-primary-bg)/50 hover:bg-(--color-primary)/5 transition-colors">
              <div className="text-2xl font-bold text-(--color-primary)">
                {appointments.length}
              </div>
              <div className="text-sm text-(--color-text-muted)">Total</div>
            </div>
            <div className="p-4 rounded-2xl bg-(--color-light-primary-bg)/50 hover:bg-(--color-primary)/5 transition-colors">
              <div className="text-2xl font-bold text-blue-600">
                {appointments.filter((a) => a.status === "Scheduled").length}
              </div>
              <div className="text-sm text-(--color-text-muted)">Upcoming</div>
            </div>
            <div className="p-4 rounded-2xl bg-(--color-light-primary-bg)/50 hover:bg-(--color-primary)/5 transition-colors">
              <div className="text-2xl font-bold text-green-600">
                {appointments.filter((a) => a.status === "Completed").length}
              </div>
              <div className="text-sm text-(--color-text-muted)">Completed</div>
            </div>
            <div className="p-4 rounded-2xl bg-(--color-light-primary-bg)/50 hover:bg-(--color-primary)/5 transition-colors">
              <div className="text-2xl font-bold text-orange-600">
                {appointments.filter((a) => a.status === "Requested").length}
              </div>
              <div className="text-sm text-(--color-text-muted)">Pending</div>
            </div>
            <div className="p-4 rounded-2xl bg-(--color-light-primary-bg)/50 hover:bg-(--color-primary)/5 transition-colors">
              <div className="text-2xl font-bold text-red-600">
                {
                  appointments.filter((a) =>
                    ["Cancelled", "No-Show"].includes(a.status),
                  ).length
                }
              </div>
              <div className="text-sm text-(--color-text-muted)">Missed</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-stretch sm:items-center">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-(--color-text-muted)" />
              <input
                type="text"
                placeholder="Search by patient or reason..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                className="w-full pl-12 pr-4 py-3 border border-(--color-border) rounded-2xl bg-(--color-surface) focus:ring-2 focus:ring-(--color-primary) focus:border-transparent transition-all duration-300 text-(--color-text) placeholder-(--color-text-muted)"
              />
            </div>

            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              className="px-6 py-3 border border-(--color-border) rounded-2xl bg-(--color-surface) focus:ring-2 focus:ring-(--color-primary) focus:border-transparent transition-all duration-300 text-(--color-text)"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-center">
        <p className="text-2xl font-bold text-(--color-text)">
          {filteredAppointments.length}{" "}
          {filteredAppointments.length === 1 ? "Appointment" : "Appointments"}
        </p>
      </div>

      {/* Appointments Grid */}
      <DoctorAppointmentCard
        appointments={filteredAppointments}
        setAppointments={setAppointments}
      />
    </div>
  );
};

export default DoctorAppointment;
