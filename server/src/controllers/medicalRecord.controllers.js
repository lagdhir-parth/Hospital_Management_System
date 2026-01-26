import MedicalRecord from "../models/medicalRecord.model.js";
import Appointment from "../models/appointment.model.js";
import Patient from "../models/patient.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

const createMedicalRecord = asyncHandler(async (req, res) => {
  const patientId = req.user._id;
  const { appointmentId } = req.params;

  if (req.role !== "patient") {
    throw new ApiError(403, "Only patients can create medical records");
  }

  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  const existingRecord = await MedicalRecord.findOne({ appointmentId });
  if (existingRecord) {
    throw new ApiError(
      400,
      "Medical record for this appointment already exists",
    );
  }

  const medicalRecord = await MedicalRecord.create({
    patientId: patientId,
    doctorId: appointment.doctorId,
    appointmentId: appointmentId,
    prescriptionId: null,
    billId: null,
  });

  // push record._id into patient's medicalHistory array
  await Patient.findByIdAndUpdate(medicalRecord.patientId, {
    $push: { medicalHistory: medicalRecord._id },
  });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "Medical record created successfully",
        medicalRecord,
      ),
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
    .populate("patientId", "name age gender contactInfo")
    .populate("doctorId", "name specialization")
    .populate("appointmentId", "dateTime status reason diseases")
    .populate("prescriptionId", "_id medicalSupplies instructions notes") // or full prescription data
    .populate("billId", "amount _id paymentStatus")
    .sort({ createdAt: -1 });

  if (records.length === 0) {
    throw new ApiError(404, "No medical records found for this user");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Medical records fetched", records));
});

const getAllMedicalRecords = asyncHandler(async (req, res) => {
  if (req.role !== "admin") {
    throw new ApiError(403, "Only admins can view all medical records");
  }

  const records = await MedicalRecord.find()
    .populate("patientId", "name age gender contactInfo")
    .populate("doctorId", "name specialization")
    .populate("appointmentId", "dateTime status reason diseases")
    .populate("prescriptionId", "_id medicalSupplies instructions notes") // or full prescription data
    .populate("billId", "amount _id paymentStatus")
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, "All medical records fetched", records));
});

const deleteMedicalRecord = asyncHandler(async (req, res) => {
  // TODO: Also delete associated prescription, bill, appointment if needed
  if (req.role !== "admin") {
    throw new ApiError(403, "Only admins can delete medical records");
  }

  const { medicalRecordId } = req.params;

  //   await Patient.updateMany(
  //     { medicalHistory: medicalRecordId },
  //     { $pull: { medicalHistory: medicalRecordId } }
  //   );  This used to remove from multiple patients which is connected to specific medicalRecord ID if needed

  await Patient.findByIdAndUpdate(
    (await MedicalRecord.findById(medicalRecordId)).patientId,
    { $pull: { medicalHistory: medicalRecordId } },
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
  deleteMedicalRecord,
  getUserMedicalRecords,
  getAllMedicalRecords,
};
