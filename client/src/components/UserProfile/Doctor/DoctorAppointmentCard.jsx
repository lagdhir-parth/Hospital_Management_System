import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Plus,
  X,
} from "lucide-react";
import api from "../../../api/axios";

const statusConfig = {
  Requested: { color: "bg-orange-100 text-orange-800", icon: AlertCircle },
  Scheduled: { color: "bg-blue-100 text-blue-800", icon: Calendar },
  Completed: { color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  Cancelled: { color: "bg-red-100 text-red-800", icon: XCircle },
  "No-Show": { color: "bg-gray-100 text-gray-800", icon: Clock },
};

const DoctorAppointmentCard = ({ appointments = [], setAppointments }) => {
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [prescriptionForm, setPrescriptionForm] = useState({
    medicalSupplies: "",
    instructions: "",
    notes: "",
  });
  const [prescriptionLoading, setPrescriptionLoading] = useState(false);

  const navigate = useNavigate();

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      // Optimistic update
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status: newStatus }
            : appointment,
        ),
      );

      // Update on server
      await api.patch(`/appointments/updateStatus/${appointmentId}`, {
        status: newStatus,
      });

      if (newStatus === "Completed") {
        try {
          await api.post("/bills/createBill", { appointmentId });
        } catch (error) {
          console.error(
            "Error creating bill for completed appointment:",
            error,
          );
        }
      }

      // Re-fetch to get server-synced data with original status restored if failed
      const response = await api.get(
        "/appointments/getDoctorSpecificAppointments",
      );
      setAppointments(response.data.data || []);
    } catch (error) {
      console.error("Error updating appointment status:", error);
      // On error, re-fetch restores original server state
      const response = await api.get(
        "/appointments/getDoctorSpecificAppointments",
      );
      setAppointments(response.data.data || []);
    }
  };

  const handleOpenPrescription = (appointment) => {
    setSelectedAppointment(appointment);
    setPrescriptionForm({ medicalSupplies: "", instructions: "", notes: "" });
    setShowPrescriptionModal(true);
  };

  const handlePrescriptionSubmit = async (e) => {
    e.preventDefault();
    if (
      !prescriptionForm.medicalSupplies.trim() ||
      !prescriptionForm.instructions.trim()
    ) {
      alert("Please fill required fields");
      return;
    }

    setPrescriptionLoading(true);
    try {
      await api.post("/prescriptions/createPrescription", {
        appointmentId: selectedAppointment._id,
        medicalSupplies: prescriptionForm.medicalSupplies,
        instructions: prescriptionForm.instructions,
        notes: prescriptionForm.notes,
      });

      // Close modal + refresh appointments
      setShowPrescriptionModal(false);
      const response = await api.get(
        "/appointments/getDoctorSpecificAppointments",
      );
      setAppointments(response.data.data || []);

      alert("✅ Prescription created successfully!");
    } catch (error) {
      console.error("Error creating prescription:", error);
      alert("Failed to create prescription. Please try again.");
    } finally {
      setPrescriptionLoading(false);
    }
  };

  if (!appointments.length) {
    return (
      <div className="text-center py-20 px-8 col-span-full">
        <Calendar className="size-24 mx-auto mb-8 text-(--color-text-muted) opacity-50" />
        <h3 className="text-3xl font-bold text-(--color-text) mb-4">
          No appointments match your filters
        </h3>
        <p className="text-xl text-(--color-text-muted) max-w-lg mx-auto">
          Try adjusting your search or status filter to see more appointments
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {appointments.map((appointment) => {
        const StatusIcon =
          statusConfig[appointment.status]?.icon || AlertCircle;
        const statusClass =
          statusConfig[appointment.status]?.color ||
          "bg-gray-100 text-gray-800";

        return (
          <div
            key={appointment._id}
            className="group border border-(--color-border) rounded-3xl bg-(--color-surface) shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden h-full flex flex-col"
          >
            {/* Status Badge */}
            <div className="px-6 pt-6 pb-4">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold border ${statusClass}`}
              >
                <StatusIcon className="size-4" />
                {appointment.status}
              </div>
            </div>

            {/* Patient Info */}
            <div className="px-6 pb-6 grow">
              <div className="flex items-center gap-4 mb-6 p-4 bg-linear-to-r from-(--color-primary)/5 to-(--color-primary-light)/5 rounded-2xl group-hover:shadow-inner transition-all">
                <div className="size-16 rounded-full bg-linear-to-br from-(--color-primary)/20 to-(--color-primary-dark)/20 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <User className="size-8 text-(--color-primary)" />
                </div>
                <h3 className="font-bold text-xl text-(--color-text) truncate">
                  {appointment.patientId?.name || "Patient Name"}
                </h3>
              </div>

              {/* Date/Time */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-4 bg-(--color-light-primary-bg)/50 rounded-2xl">
                  <Calendar className="size-6 text-(--color-primary) shrink-0" />
                  <div>
                    {/* ✅ Date - UTC */}
                    <div className="font-bold text-lg text-(--color-text)">
                      {new Intl.DateTimeFormat("en-IN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        timeZone: "UTC",
                      }).format(new Date(appointment.dateTime))}
                    </div>

                    {/* ✅ Time - UTC */}
                    <div className="text-sm text-(--color-text-muted)">
                      {new Intl.DateTimeFormat("en-IN", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                        timeZone: "UTC",
                      }).format(new Date(appointment.dateTime))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reason & Diseases */}
              <div className="space-y-4">
                <div>
                  <p className="flex items-center gap-2 mb-2 text-sm font-semibold text-(--color-text-muted)">
                    <MapPin className="size-4" />
                    Reason for visit
                  </p>
                  <p className="text-(--color-text) leading-relaxed bg-(--color-light-primary-bg)/30 p-4 rounded-xl font-medium">
                    {appointment.reason}
                  </p>
                </div>

                <div>
                  <p className="flex items-center gap-2 mb-2 text-sm font-semibold text-(--color-text-muted)">
                    <AlertCircle className="size-4 text-red-500" />
                    Reported conditions
                  </p>
                  <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                    <p className="text-sm text-red-800 font-medium">
                      {appointment.diseases}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="px-6 pb-6 pt-4 mt-auto border-t border-(--color-border)/50">
              <div className="flex flex-col gap-3">
                {appointment.status === "Requested" ? (
                  <>
                    <ActionBtns
                      text="Approve"
                      onClick={() =>
                        handleStatusChange(appointment._id, "Scheduled")
                      }
                    />
                    <ActionBtns
                      text="Cancel"
                      onClick={() =>
                        handleStatusChange(appointment._id, "Cancelled")
                      }
                    />
                  </>
                ) : appointment.status === "Scheduled" ? (
                  <>
                    <ActionBtns
                      text="Complete"
                      onClick={() =>
                        handleStatusChange(appointment._id, "Completed")
                      }
                    />
                    <ActionBtns
                      text="No-Show"
                      onClick={() =>
                        handleStatusChange(appointment._id, "No-Show")
                      }
                    />
                  </>
                ) : appointment.status === "Completed" ? (
                  <>
                    <button
                      className="bg-(--color-error)/90 text-white border-(--color-error)/30 hover:bg-(--color-error) hover:border-(--color-error)/70 px-6 py-3 border font-semibold rounded-2xl transition-all duration-300 text-sm cursor-pointer"
                      onClick={() => handleOpenPrescription(appointment)}
                    >
                      Add Prescription
                    </button>
                    <ActionBtns
                      text="View Medical Record"
                      onClick={() => {
                        console.log("View record", appointment._id);
                        navigate("/profile/doctor/medical-history");
                      }}
                    />
                  </>
                ) : appointment.status === "Cancelled" ? (
                  <ActionBtns
                    text="Approve"
                    onClick={() =>
                      handleStatusChange(appointment._id, "Scheduled")
                    }
                  />
                ) : appointment.status === "No-Show" ? null : null}
              </div>
            </div>
          </div>
        );
      })}
      {/* ✅ Prescription Modal */}
      {showPrescriptionModal && (
        <PrescriptionModal
          appointment={selectedAppointment}
          formData={prescriptionForm}
          setFormData={setPrescriptionForm}
          loading={prescriptionLoading}
          onSubmit={handlePrescriptionSubmit}
          onClose={() => setShowPrescriptionModal(false)}
        />
      )}
    </div>
  );
};

// ✅ Prescription Modal Component
const PrescriptionModal = ({
  appointment,
  formData,
  setFormData,
  loading,
  onSubmit,
  onClose,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
      <div className="bg-(--color-surface) border border-(--color-border) rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-(--color-surface) border-b border-(--color-border) p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-16 bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Plus className="size-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-(--color-text)">
                  New Prescription
                </h2>
                <p className="text-(--color-text-muted)">
                  For {appointment?.patientId?.name} -{" "}
                  {new Date(appointment?.dateTime).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-(--color-light-primary-bg) rounded-2xl transition-colors"
            >
              <X className="size-6 text-(--color-text-muted)" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-8 space-y-8">
          {/* Medical Supplies */}
          <div>
            <label className="block text-sm font-semibold text-(--color-text-muted) mb-3">
              Medical Supplies (comma separated)
            </label>
            <textarea
              name="medicalSupplies"
              value={formData.medicalSupplies}
              onChange={handleChange}
              placeholder="Paracetamol 500mg, Amoxicillin 250mg, ..."
              className="w-full p-4 border border-(--color-border) rounded-2xl bg-(--color-light-primary-bg)/50 focus:ring-2 focus:ring-(--color-primary) focus:border-transparent resize-vertical min-h-[120px] text-(--color-text)"
              required
            />
            <p className="text-xs text-(--color-text-muted) mt-2">
              Enter medicines separated by commas (e.g., "Paracetamol 500mg,
              Vitamin C")
            </p>
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-semibold text-(--color-text-muted) mb-3">
              Instructions
            </label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Take 1 tablet after meals, twice daily for 5 days..."
              className="w-full p-4 border border-(--color-border) rounded-2xl bg-(--color-light-primary-bg)/50 focus:ring-2 focus:ring-(--color-primary) focus:border-transparent resize-vertical min-h-[100px] text-(--color-text)"
              required
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-(--color-text-muted) mb-3">
              Additional Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Follow up in 2 weeks, avoid alcohol..."
              className="w-full p-4 border border-(--color-border) rounded-2xl bg-(--color-light-primary-bg)/50 focus:ring-2 focus:ring-(--color-primary) focus:border-transparent resize-vertical min-h-20 text-(--color-text)"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 text-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                  Creating...
                </>
              ) : (
                "Create Prescription"
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-(--color-light-primary-bg)/50 hover:bg-(--color-light-primary-bg) border border-(--color-border) text-(--color-text) font-semibold py-4 px-8 rounded-2xl hover:border-(--color-primary) hover:text-(--color-primary) transition-all duration-300 flex items-center justify-center text-lg"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ActionBtns = ({ text, onClick }) => {
  const colors = {
    Cancel:
      "bg-(--color-error)/90 text-white border-(--color-error)/30 hover:bg-(--color-error) hover:border-(--color-error)/70",
    Approve:
      "bg-(--color-success)/90 text-white border-(--color-success)/30 hover:bg-(--color-success) hover:border-(--color-success)/70",
    Reshedule:
      "bg-(--color-primary)/90 text-white border-(--color-primary)/30 hover:bg-(--color-primary) hover:border-(--color-primary)/70",
    Complete:
      "bg-(--color-success)/90 text-white border-(--color-success)/30 hover:bg-(--color-success) hover:border-(--color-success)/70",
    "No-Show":
      "bg-(--color-warning)/90 text-white border-(--color-warning)/30 hover:bg-(--color-warning) hover:border-(--color-warning)/70",
  };
  return (
    <button
      className={`px-6 py-3 border border-(--color-border) text-(--color-text) font-semibold rounded-2xl transition-all duration-300 text-sm cursor-pointer ${colors[text]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default DoctorAppointmentCard;
