import Bill from "../models/bill.model.js";
import Appointment from "../models/appointment.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

const createBill = asyncHandler(async (req, res) => {
  const { appointmentId } = req.body || {};

  if (!appointmentId) {
    throw new ApiError(400, "Appointment ID is required to create a bill");
  }

  const appointment = await Appointment.findById(appointmentId).populate(
    "doctorId",
    "name username email consultationFee mobileNumber"
  );
  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  const existingBill = await Bill.findOne({ appointmentId });
  if (existingBill) {
    throw new ApiError(400, "Bill already exists for this appointment");
  }

  const bill = await Bill.create({
    patientId: appointment.patientId,
    appointmentId: appointment._id,
    doctorId: appointment.doctorId,
    amount: appointment.doctorId.consultationFee || 0,
    paymentStatus: "Pending",
    paymentMethod: null,
  });

  res.status(201).json(new ApiResponse(201, "Bill created successfully", bill));
});

const updatePayment = asyncHandler(async (req, res) => {
  const { billId, paymentMethod } = req.body || {};

  if (!billId || !paymentMethod) {
    throw new ApiError(400, "Bill ID and payment method are required");
  }

  const bill = await Bill.findById(billId);
  if (!bill) {
    throw new ApiError(404, "Bill not found");
  }

  const validMethods = [
    "Credit Card",
    "Debit Card",
    "Insurance",
    "Online Payment",
  ];

  if (!validMethods.includes(paymentMethod)) {
    throw new ApiError(400, "Invalid payment method");
  }

  bill.paymentStatus = "Paid";
  bill.paymentMethod = paymentMethod;
  await bill.save();

  res
    .status(200)
    .json(new ApiResponse(200, "Payment updated successfully", bill));
});

const getBillById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Bill ID is required");
  }

  const bill = await Bill.findById(id);
  if (!bill) {
    throw new ApiError(404, "Bill not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Bill retrieved successfully", bill));
});

const deleteBill = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Bill ID is required");
  }

  if (req.role !== "admin") {
    throw new ApiError(403, "Only admins can delete bills");
  }

  const bill = await Bill.findByIdAndDelete(id);
  if (!bill) {
    throw new ApiError(404, "Bill not found");
  }

  res.status(200).json(new ApiResponse(200, "Bill deleted successfully", bill));
});

export { createBill, updatePayment, getBillById, deleteBill };