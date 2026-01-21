import Appointment from "../models/appointment.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";
import Department from "../models/department.model.js";

const requestAppointment = asyncHandler(async (req, res) => {
  const patientId = req.user._id;
  const { doctorId, departmentId, date, time, diseases, reason } = req.body;
  const status = "Requested";

  if (!doctorId || !departmentId || !patientId) {
    throw new ApiError(400, "All IDs are required");
  }

  if (req.role != "patient") {
    throw new ApiError(403, "Only patients can book appointments");
  }

  const patient = await Patient.findById(patientId);
  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }

  const department = await Department.findById(departmentId);
  if (!department) {
    throw new ApiError(404, "Department not found");
  }

  if (
    !diseases ||
    diseases.trim() === "" ||
    !reason ||
    reason.trim() === "" ||
    !date ||
    !time
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const combinnedDateTime = new Date(`${date}T${time}Z`); // If i append Z, it treats the time as UTC(Original value as frontend), otherwise it considers it as local time zone(my time zone is GMT+5:30)
  if (isNaN(combinnedDateTime.getTime())) {
    throw new ApiError(400, "Invalid date or time format");
  }

  const dateTimeObject = new Date(combinnedDateTime);

  const dateTime = dateTimeObject.toISOString();

  console.log("Combined DateTime (UTC):", dateTime.toLocaleString());

  const appointment = await Appointment.create({
    patientId: patientId,
    doctorId: doctorId,
    departmentId: departmentId,
    diseases,
    reason,
    dateTime,
    status,
  });

  res
    .status(201)
    .json(
      new ApiResponse(201, "Appointment requested successfully", appointment),
    );
});

const getAppointmentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Appointment ID is required");
  }

  const appointment = await Appointment.findById(id);
  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Appointment retrieved successfully", appointment),
    );
});

const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find();

  if (appointments.length === 0) {
    throw new ApiError(404, "No appointments found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Appointments retrieved successfully", appointments),
    );
});

const getDoctorSpecificAppointments = asyncHandler(async (req, res) => {
  const doctorId = req.user._id;
  if (req.role !== "doctor") {
    throw new ApiError(403, "Only doctors can access their appointments");
  }

  const appointments = await Appointment.find({ doctorId })
    .populate("patientId", "name _id")
    .populate("departmentId", "name")
    .sort({ dateTime: -1 });
  if (appointments.length === 0) {
    throw new ApiError(404, "No appointments found for this doctor");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Doctor's appointments retrieved successfully",
        appointments,
      ),
    );
});

const getPatientSpecificAppointments = asyncHandler(async (req, res) => {
  const patientId = req.user._id;
  if (req.role !== "patient") {
    throw new ApiError(403, "Only patients can access their appointments");
  }

  const appointments = await Appointment.find({ patientId })
    .populate("doctorId", "name username")
    .populate("departmentId", "name")
    .populate("patientId", "name") // optional
    .sort({ dateTime: -1 });

  if (appointments.length === 0) {
    throw new ApiError(404, "No appointments found for this patient");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Patient's appointments retrieved successfully",
        appointments,
      ),
    );
});

const getDepartmentSpecificAppointments = asyncHandler(async (req, res) => {
  const { departmentId } = req.params;
  if (req.role !== "admin") {
    throw new ApiError(403, "Only admins can access department appointments");
  }

  const appointments = await Appointment.find({ departmentId });
  if (appointments.length === 0) {
    throw new ApiError(404, "No appointments found for this department");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Department's appointments retrieved successfully",
        appointments,
      ),
    );
});

const getUserUpcomingAppointments = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const role = req.role;

  const appointments = await Appointment.find({
    [role === "doctor" ? "doctorId" : "patientId"]: userId,
    $and: [
      //   { dateTime: { $gte: new Date() } },
      { status: { $in: ["Scheduled", "Requested"] } },
    ],
  });

  if (appointments.length === 0) {
    throw new ApiError(404, "No upcoming appointments found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Upcoming appointments retrieved successfully",
        appointments,
      ),
    );
});

const updateStatusById = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;

  if (req.role !== "doctor" && req.role !== "admin") {
    throw new ApiError(
      403,
      "Only admins or doctors can update appointment status",
    );
  }

  if (!appointmentId) {
    throw new ApiError(400, "Appointment ID is required");
  }

  if (
    !status ||
    !["Requested", "Scheduled", "Completed", "Cancelled", "No-Show"].includes(
      status,
    )
  ) {
    throw new ApiError(400, "Valid status is required");
  }

  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  appointment.status = status;
  await appointment.save({ validateBeforeSave: false });

  if (status === "Completed") {
    const doctor = await Doctor.findById(appointment.doctorId._id);
    doctor?.treatedPatients.addToSet(appointment.patientId);
    await doctor?.save();
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Appointment status updated successfully",
        appointment,
      ),
    );
});

const deleteAppointmentById = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;

  if (req.role !== "admin") {
    throw new ApiError(403, "Only admins can delete appointments");
  }

  if (!appointmentId) {
    throw new ApiError(400, "Appointment ID is required");
  }

  const appointment = await Appointment.findByIdAndDelete(appointmentId);
  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Appointment deleted successfully", appointment),
    );
});

export {
  requestAppointment,
  getAppointmentById,
  getAllAppointments,
  getDoctorSpecificAppointments,
  getPatientSpecificAppointments,
  getDepartmentSpecificAppointments,
  getUserUpcomingAppointments,
  updateStatusById,
  deleteAppointmentById,
};
