import Prescription from "../models/prescription.model.js";
import Appointment from "../models/appointment.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import MedicalRecord from "../models/medicalRecord.model.js";
import Doctor from "../models/doctor.model.js";

const createPrescription = asyncHandler(async (req, res) => {
  const { appointmentId, medicalSupplies, instructions, notes } = req.body;

  if (!appointmentId || !medicalSupplies || !instructions) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    return res.status(404).json(new ApiError(404, "Appointment not found"));
  }

  if (req.role !== "doctor") {
    throw new ApiError(403, "Only doctors can create prescriptions");
  }

  const existingPrescription = await Prescription.findOne({ appointmentId });
  if (existingPrescription) {
    throw new ApiError(400, "Prescription for this appointment already exists");
  }

  const newPrescription = await Prescription.create({
    patientId: appointment.patientId,
    appointmentId,
    medicalSupplies: medicalSupplies
      ? medicalSupplies.split(",").map((item) => item.trim())
      : [],
    instructions,
    notes,
  });

  const medicalRecord = await MedicalRecord.findOne({
    patientId: appointment.patientId,
    doctorId: appointment.doctorId._id, // ✅ Use populated ._id
    appointmentId: appointment._id, // ✅ KEY: Match exact appointment!
  });

  // ✅ Update if record exists
  if (medicalRecord) {
    medicalRecord.prescriptionId = newPrescription._id;
    await medicalRecord.save();
    console.log(
      `✅ Prescription ${newPrescription._id} attached to MedicalRecord ${medicalRecord._id}`,
    );
  } else {
    console.log(`⚠️ No MedicalRecord found for appointment ${appointmentId}`);
  }

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "Prescription created successfully",
        newPrescription,
      ),
    );
});

const getPrescriptionsByAppointment = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;

  if (!appointmentId) {
    return res
      .status(400)
      .json(new ApiError(400, "Appointment ID is required"));
  }

  const prescriptions = await Prescription.find({ appointmentId });

  if (prescriptions.length === 0) {
    return res
      .status(404)
      .json(new ApiError(404, "No prescriptions found for this appointment"));
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Prescriptions retrieved successfully",
        prescriptions,
      ),
    );
});

const updatePrescription = asyncHandler(async (req, res) => {
  if (!req.role || req.role !== "doctor") {
    throw new ApiError(403, "Only doctors can update prescriptions");
  }

  const { prescriptionId } = req.params;
  const { medicalSupplies, instructions, notes } = req.body;

  if (!medicalSupplies && !instructions && !notes) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  const prescription = await Prescription.findByIdAndUpdate(
    prescriptionId,
    { medicalSupplies, instructions, notes },
    { new: true },
  );

  if (!prescription) {
    return res.status(404).json(new ApiError(404, "Prescription not found"));
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Prescription updated successfully", prescription),
    );
});

const deletePrescription = asyncHandler(async (req, res) => {
  const { prescriptionId } = req.params;

  if (!prescriptionId) {
    return res
      .status(400)
      .json(new ApiError(400, "Prescription ID is required"));
  }

  if (!req.role || req.role !== "doctor") {
    throw new ApiError(403, "Only doctors can delete prescriptions");
  }

  const prescription = await Prescription.findByIdAndDelete(prescriptionId);
  if (!prescription) {
    return res.status(404).json(new ApiError(404, "Prescription not found"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Prescription deleted successfully", null));
});

export {
  createPrescription,
  getPrescriptionsByAppointment,
  updatePrescription,
  deletePrescription,
};
