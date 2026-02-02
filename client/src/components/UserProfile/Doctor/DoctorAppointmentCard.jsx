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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
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

      try {
        const appointment = await api.get(
          `/appointments/getAppointment/${appointmentId}`,
        );

        const htmlMsg = `
           <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
             <div style="text-align: center; margin-bottom: 30px;">
               <h1 style="color: #1e40af; font-size: 28px; margin: 0; font-weight: 700;">HMS Appointment Update</h1>
               <p style="color: #64748b; font-size: 16px; margin: 10px 0 0 0;">Your appointment status has been updated</p>
             </div>

             <div style="background: white; padding: 25px; border-radius: 10px; border-left: 5px solid #1e40af; margin-bottom: 25px;">
               <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                 <tr style="background: #f1f5f9;">
                   <td style="padding: 12px 16px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Patient</td>
                   <td style="padding: 12px 16px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">${appointment.data.data.patientId.name || appointment.data.data.patientId.email}</td>
                 </tr>
                 <tr>
                   <td style="padding: 12px 16px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Doctor</td>
                   <td style="padding: 12px 16px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">${appointment.data.data.doctorId.name}</td>
                 </tr>
                 <tr style="background: #fef3c7;">
                   <td style="padding: 12px 16px; font-weight: 600; color: #92400e;">New Status</td>
                   <td style="padding: 12px 16px; color: #b45309; font-weight: 600; font-size: 16px;">${newStatus.toUpperCase()}</td>
                 </tr>
                 <tr>
                   <td style="padding: 12px 16px; font-weight: 600; color: #374151;">Date & Time</td>
                   <td style="padding: 12px 16px; color: #6b7280;">${new Date(appointment.data.data.date).toLocaleDateString()} at ${appointment.data.data.time}</td>
                 </tr>
                 <tr>
                   <td style="padding: 12px 16px; font-weight: 600; color: #374151;">Department</td>
                   <td style="padding: 12px 16px; color: #6b7280;">${appointment.data.data.doctorId.department || "General"}</td>
                 </tr>
               </table>
             </div>

             <div style="background: white; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 25px;">
               <p style="color: #374151; margin: 0 0 20px 0; font-size: 16px;">
                 Please arrive 15 minutes early. Bring your ID and insurance details.
               </p>
               <div style="display: inline-block; background: #1e40af; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                 View Appointment Details
                </div>
              </div>

              <div style="background: #eff6ff; padding: 20px; border-radius: 10px; border-left: 4px solid #1e40af;">
                <p style="margin: 0 0 10px 0; color: #1e3a8a; font-weight: 500;">Need Help?</p>
                <p style="margin: 0; color: #475569; font-size: 14px;">
                  Contact HMS support: <strong>+1-234-567-8900</strong> | <strong>support@hms.com</strong>
                </p>
              </div>

              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="color: #9ca3af; font-size: 13px; margin: 0;">
                  This is an automated message from Hospital Management System (HMS).<br>
                  ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })}
                </p>
              </div>
            </div>
          `;
        setLoading(true);

        await api.post(
          "/send-email",
          {
            to: appointment.data.data.patientId.email,
            email: appointment.data.data.patientId.email,
            name: appointment.data.data.patientId.name,
            subject: `HMS Appointment Update: Your appointment is now ${newStatus}`,
            msg: htmlMsg,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }, // If protected
          },
        );

        alert("Message sent to Patient!");
      } catch (error) {
        console.log(error);
        console.log(error.response?.data?.message || "Failed to send message");
        alert(error.response?.data?.message || "Failed to send message");
      } finally {
        setLoading(false);
      }

      // Optimistic update
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status: newStatus }
            : appointment,
        ),
      );

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

      try {
        const appointment = await api.get(
          `/appointments/getAppointment/${selectedAppointment._id}`,
        );

        const htmlMsg = `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 30px; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.12);">
  
  <!-- Header -->
  <div style="text-align: center; margin-bottom: 35px; padding-bottom: 25px; border-bottom: 3px solid #10b981;">
    <h1 style="color: #10b981; font-size: 32px; margin: 0 0 10px 0; font-weight: 800;">✅ Prescription Ready</h1>
    <p style="color: #64748b; font-size: 18px; margin: 0; font-weight: 500;">Your medications from Dr. ${appointment.data.data.doctorId.name}</p>
  </div>

  <!-- Prescription Header -->
  <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 25px; border: 2px solid #d1fae5;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <div>
        <h3 style="color: #065f46; margin: 0 0 5px 0; font-size: 22px;">📋 Prescription RX-${Math.floor(Math.random() * 10000) + 1000}</h3>
        <p style="color: #6b7280; margin: 0; font-size: 15px;">Issued: ${new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })} | ${new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" })}</p>
      </div>
      <div style="text-align: right;">
        <p style="color: #10b981; font-weight: 700; margin: 0 0 2px 0; font-size: 18px;">Dr. ${appointment.data.data.doctorId.name}</p>
        <p style="color: #6b7280; font-size: 14px; margin: 0;">${appointment.data.data.doctorId.department || "Specialist"}</p>
      </div>
    </div>
  </div>

  <!-- Medications Table - Fixed for your formData -->
  <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
    <h3 style="color: #065f46; margin: 0 0 20px 0; font-size: 22px; font-weight: 700;">💊 Prescribed Medications</h3>
    <table style="width: 100%; border-collapse: collapse; font-size: 16px;">
      <thead>
        <tr style="background: linear-gradient(135deg, #10b981, #059669); color: white;">
          <th style="padding: 16px 14px; text-align: left; font-weight: 600;">Medication</th>
          <th style="padding: 16px 14px; text-align: left; font-weight: 600;">Dosage / Instructions</th>
        </tr>
      </thead>
      <tbody>
        ${prescriptionForm.medicalSupplies
          .split(",")
          .map((med) => med.trim())
          .filter(Boolean)
          .map(
            (med, index) => `
            <tr style="${index % 2 === 0 ? "background: #f0fdf4;" : ""} border-bottom: 1px solid #d1fae5;">
              <td style="padding: 16px 14px; font-weight: 600; color: #065f46;">${med}</td>
              <td style="padding: 16px 14px; color: #166534;">Follow doctor's instructions</td>
            </tr>
          `,
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <!-- Instructions - Prominent Warning -->
  <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 25px; border-radius: 12px; border-left: 6px solid #d97706; margin-bottom: 25px;">
    <h3 style="color: #92400e; margin: 0 0 18px 0; font-size: 20px; font-weight: 700;">⚠️ Usage Instructions</h3>
    <div style="background: white; padding: 22px; border-radius: 10px; border: 2px dashed #f59e0b;">
      <p style="margin: 0 0 12px 0; color: #92400e; line-height: 1.7; font-size: 16px; font-weight: 500;">
        ${prescriptionForm.instructions.replace(/\n/g, "<br>")}
      </p>
      ${
        prescriptionForm.notes
          ? `
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #fed7aa; padding-left: 20px;">
          <p style="margin: 0; color: #b45309; font-style: italic; font-size: 15px;">
            <strong>📝 Doctor's Notes:</strong> ${prescriptionForm.notes.replace(/\n/g, "<br>")}
          </p>
        </div>
      `
          : ""
      }
    </div>
  </div>

  <!-- Action Cards -->
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
    <div style="background: white; padding: 25px; border-radius: 12px; text-align: center; border: 2px solid #dbeafe;">
      <div style="background: #eff6ff; width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
        <svg style="width: 28px; height: 28px; fill: #1e40af;" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
      </div>
      <h4 style="color: #1e3a8a; margin: 0 0 8px 0; font-size: 18px; font-weight: 700;">Follow Instructions</h4>
      <p style="color: #475569; margin: 0; font-size: 14px;">Complete full course</p>
    </div>
    <div style="background: white; padding: 25px; border-radius: 12px; text-align: center; border: 2px solid #dcfce7;">
      <div style="background: #f0fdf4; width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
        <svg style="width: 28px; height: 28px; fill: #16a34a;" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </div>
      <h4 style="color: #166534; margin: 0 0 8px 0; font-size: 18px; font-weight: 700;">Contact if Issues</h4>
      <p style="color: #475569; margin: 0; font-size: 14px;">Side effects? Call doctor</p>
    </div>
  </div>

  <!-- Final CTA -->
  <div style="background: white; padding: 30px; border-radius: 16px; text-align: center; box-shadow: 0 8px 25px rgba(16,185,129,0.15);">
    <p style="color: #065f46; margin: 0 0 25px 0; font-size: 17px; font-weight: 600;">
      Questions about your prescription? Contact us immediately.
    </p>
    <div style="display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 16px 45px; border-radius: 12px; font-weight: 700; font-size: 17px; box-shadow: 0 6px 20px rgba(16,185,129,0.3); text-decoration: none;">
      Call Doctor Now
    </div>
  </div>

  <!-- Footer -->
  <div style="text-align: center; padding-top: 30px; border-top: 3px solid #d1fae5;">
    <p style="color: #9ca3af; font-size: 15px; margin: 0 0 12px 0; font-weight: 500;">
      Hospital Management System (HMS) | Digital Prescription Portal
    </p>
    <p style="color: #6b7280; font-size: 14px; margin: 0;">
      Emergency: <strong>108</strong> | Support: <strong>+91-XXXXXXXXXX</strong> | <strong>pharmacy@hms.in</strong>
    </p>
  </div>
</div>
`;

        setLoading(true);

        await api.post(
          "/send-email",
          {
            to: appointment.data.data.patientId.email,
            email: appointment.data.data.patientId.email,
            name: appointment.data.data.patientId.name,
            subject: `HMS Appointment Update: Your prescription is ready`,
            msg: htmlMsg,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }, // If protected
          },
        );

        alert("Message sent to Patient!");
      } catch (error) {
        console.log(error);
        console.log(error.response?.data?.message || "Failed to send message");
        alert(error.response?.data?.message || "Failed to send message");
      } finally {
        setLoading(false);
      }

      // Close modal + refresh appointments
      setShowPrescriptionModal(false);
      const response = await api.get(
        "/appointments/getDoctorSpecificAppointments",
      );
      setAppointments(response.data.data || []);
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
                {loading ? (
                  "loading..."
                ) : appointment.status === "Requested" ? (
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
