import MedicalRecord from "../models/medicalRecord.model.js";
import Appointment from "../models/appointment.model.js";
import Patient from "../models/patient.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

const createMedicalRecord = asyncHandler(async (req, res) => {
  const doctorId = req.user._id;
  const { appointmentId } = req.params;

  if (req.role !== "doctor") {
    throw new ApiError(403, "Only doctors can create medical records");
  }

  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  const existingRecord = await MedicalRecord.findOne({ appointmentId });
  if (existingRecord) {
    throw new ApiError(
      400,
      "Medical record for this appointment already exists"
    );
  }

  const medicalRecord = await MedicalRecord.create({
    patientId: appointment.patientId,
    doctorId: doctorId,
    appointmentId: appointmentId,
    prescriptionId: null,
  });

  // push record._id into patient's medicalHistory array
  await Patient.findByIdAndUpdate(medicalRecord.patientId, {
    $push: { medicalHistory: medicalRecord._id },
  });

  res
    .status(201)
    .json(
      new ApiResponse(201, "Medical record created successfully", medicalRecord)
    );
});

const getUserMedicalRecords = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const roleModelMap = {
    doctor: "doctorId",
    patient: "patientId",
  };
  const Model = roleModelMap[req.role];
  if (!Model) {
    throw new ApiError(403, "Invalid role to view medical records");
  }

  const records = await MedicalRecord.find({ [Model]: userId })
    .populate("doctorId", "name specialization")
    .populate("appointmentId", "dateTime status")
    .populate("prescriptionId", "medicalSupplies instructions")
    .sort({ createdAt: -1 });

  if (records.length === 0) {
    throw new ApiError(404, "No medical records found for this user");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Medical records fetched", records));
});

const addPrescriptionToMedicalRecord = asyncHandler(async (req, res) => {
  if (req.role !== "doctor") {
    throw new ApiError(
      403,
      "Only doctors can add prescriptions to medical records"
    );
  }

  const { medicalRecordId } = req.params;
  const { prescriptionId } = req.body;

  if (!prescriptionId) {
    throw new ApiError(400, "Prescription ID is required");
  }

  const medicalRecord = await MedicalRecord.findByIdAndUpdate(
    medicalRecordId,
    { prescriptionId },
    { new: true }
  );

  if (!medicalRecord) {
    throw new ApiError(404, "Medical record not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Prescription added to medical record successfully",
        medicalRecord
      )
    );
});

const deleteMedicalRecord = asyncHandler(async (req, res) => {
  if (req.role !== "admin") {
    throw new ApiError(403, "Only admins can delete medical records");
  }

  const { medicalRecordId } = req.params;

  //   await Patient.updateMany(
  //     { medicalHistory: medicalRecordId },
  //     { $pull: { medicalHistory: medicalRecordId } }
  //   );  This used to remove from multiple patients which is connected to specific medicalRecord ID if needed

  await Patient.findByIdAndUpdate(
    (
      await MedicalRecord.findById(medicalRecordId)
    ).patientId,
    { $pull: { medicalHistory: medicalRecordId } }
  );

  const medicalRecord = await MedicalRecord.findByIdAndDelete(medicalRecordId);
  if (!medicalRecord) {
    throw new ApiError(404, "Medical record not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Medical record deleted successfully", null));
});

export {
  createMedicalRecord,
  addPrescriptionToMedicalRecord,
  deleteMedicalRecord,
  getUserMedicalRecords,
};
