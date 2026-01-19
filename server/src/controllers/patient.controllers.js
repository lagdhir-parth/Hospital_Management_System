import Patient from "../models/patient.model.js";
import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import uploadOnCloudinary, {
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import generateAccessTokenAndRefreshToken from "../utils/generateTokens.js";
import fs from "fs";

const cookieOptions = {
  httpOnly: true,
  secure: true, // REQUIRED for mobile
  sameSite: "None", // REQUIRED for mobile
  maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
};

const registerPatient = asyncHandler(async (req, res) => {
  const {
    name,
    username,
    mobile_no,
    email,
    description,
    password,
    age,
    bloodGroup,
    gender,
    diagnoses,
    allergies,
    address,
  } = req.body ?? {};

  //   if (
  //     !name ||
  //     !username ||
  //     !mobile_no ||
  //     !email ||
  //     !password ||
  //     !age ||
  //     !bloodGroup ||
  //     !gender ||
  //     !address
  //   ) {
  //     res.status(400);
  //     throw new ApiError(400, "Please fill all the required fields");
  //   }

  const requiredFields = [
    name,
    username,
    mobile_no,
    email,
    description,
    password,
    bloodGroup,
    gender,
    diagnoses,
    address,
  ];

  if (requiredFields.some((field) => !field || field.trim() === "")) {
    if (req.file?.path) fs.unlinkSync(req.file.path);
    res.status(400);
    throw new ApiError(400, "Please fill all required fields");
  }

  // check if patient already exists
  const patientExists = await Patient.findOne({
    $or: [
      { username: { $regex: new RegExp(`^${username.trim()}$`, "i") } },
      { email: { $regex: new RegExp(`^${email.trim()}$`, "i") } },
    ],
  });

  if (patientExists) {
    if (req.file?.path) fs.unlinkSync(req.file.path);
    throw new ApiError(
      400,
      `Patient with this ${
        patientExists.username === username.trim() ? "username" : "email"
      } already exists`
    );
  }

  // check for profile pic
  let profilePic = null;
  let profilePicPublicId = null;

  if (req.file) {
    // upload profile pic to cloudinary
    const cloudinaryResult = await uploadOnCloudinary(
      req.file?.path,
      "hospital_management_system/patients"
    );

    if (!cloudinaryResult) {
      res.status(500);
      throw new ApiError(500, "Error uploading profile picture to cloudinary");
    }
    profilePic = cloudinaryResult.url;
    profilePicPublicId = cloudinaryResult.public_id;
  }

  // create new patient
  const patient = await Patient.create({
    name,
    username: username.toLowerCase(),
    mobile_no,
    email,
    description,
    password,
    age,
    bloodGroup,
    gender,
    diagnoses: diagnoses ? diagnoses.split(",").map((d) => d.trim()) : [],
    allergies: allergies ? allergies.split(",").map((a) => a.trim()) : [],
    profilePic,
    profilePicPublicId,
    address,
  });

  const createdPatient = await Patient.findById(patient._id).select(
    "-password -refreshToken"
  );

  if (!createdPatient) {
    throw new ApiError(500, "Error creating patient");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, "Patient registered successfully", createdPatient)
    );
});

const getPatientById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // validate ObjectId to avoid CastError when a non-objectId string is passed
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new ApiError(400, "Invalid patient id");
  }

  const patient = await Patient.findById(id).select("-password -refreshToken");

  if (!patient) {
    res.status(404);
    throw new ApiError(404, "Patient not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Patient fetched successfully", patient));
});

const getAllPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find().select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, "Patients fetched successfully", patients));
});

const updateProfilePic = asyncHandler(async (req, res) => {
  const patientId = req.user._id;

  if (req.role !== "patient") {
    fs.unlinkSync(req.file.path);
    res.status(403);
    throw new ApiError(
      403,
      "Forbidden! Only patients can update their profile picture"
    );
  }

  if (!patientId) {
    res.status(400);
    throw new ApiError(400, "Patient id is required to change profile picture");
  }

  if (!req.file) {
    res.status(400);
    throw new ApiError(400, "Profile picture is required");
  }

  const patient = await Patient.findById(patientId);
  if (!patient) {
    res.status(404);
    throw new ApiError(404, "Patient not found");
  }

  if (patient.profilePicPublicId) {
    try {
      const delResult = await deleteFromCloudinary(patient.profilePicPublicId);
      if (!delResult) {
        console.warn(
          "Cloudinary deletion returned unexpected result:",
          delResult
        );
      }
    } catch (err) {
      console.error("Error deleting old profile pic from Cloudinary:", err);
    }
  }

  const uploadedProfilePic = await uploadOnCloudinary(
    req.file?.path,
    "hospital_management_system/patients"
  );

  if (!uploadedProfilePic) {
    res.status(500);
    throw new ApiError(500, "Error uploading profile picture to cloudinary");
  }

  const updatedPatient = await Patient.findByIdAndUpdate(
    patientId,
    {
      profilePic: uploadedProfilePic.url,
      profilePicPublicId: uploadedProfilePic.public_id,
    },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Profile picture updated successfully",
        updatedPatient
      )
    );
});

const updateProfile = asyncHandler(async (req, res) => {
  const patientId = req.user._id;

  if (req.role !== "patient") {
    res.status(403);
    throw new ApiError(
      403,
      "Forbidden! Only patients can update their profile"
    );
  }

  const updateData = req.body;
  const allowedUpdates = [
    "name",
    "username",
    "description",
    "mobile_no",
    "email",
    "address",
  ];

  if (!updateData || Object.keys(updateData).length === 0) {
    res.status(400);
    throw new ApiError(400, "Please provide data to update");
  }

  // Validate update fields
  const updates = Object.keys(updateData);
  const isValidOperation = updates.every(
    (update) => allowedUpdates.includes(update) && updateData[update] !== ""
  );

  if (!isValidOperation) {
    res.status(400);
    throw new ApiError(400, "Invalid updates!");
  }

  const existedPatient = await Patient.findOne({
    $or: [
      { username: { $regex: new RegExp(`^${updateData.username}$`, "i") } },
      { email: { $regex: new RegExp(`^${updateData.email}$`, "i") } },
    ],
    _id: { $ne: patientId }, //$ne: "Not equal"
  });

  if (existedPatient) {
    res.status(400);
    throw new ApiError(
      400,
      `Patient with this ${
        existedPatient.username === updateData.username ? "username" : "email"
      } already exists`
    );
  }

  const updatedPatient = await Patient.findByIdAndUpdate(
    patientId,
    updateData,
    { new: true, runValidators: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, "Profile updated successfully", updatedPatient));
});

const updateMedicalInfo = asyncHandler(async (req, res) => {
  const patientId = req.user._id;

  if (req.role !== "patient") {
    res.status(403);
    throw new ApiError(
      403,
      "Forbidden! Only patients can update their diagnoses and allergies"
    );
  }

  const { diagnoses, allergies } = req.body || {};

  if (!diagnoses && !allergies) {
    res.status(400);
    throw new ApiError(400, "Please provide diagnoses or allergies to update");
  }

  const updatedPatient = await Patient.findByIdAndUpdate(
    patientId,
    {
      diagnoses: diagnoses ? diagnoses.split(",").map((d) => d.trim()) : [],
      allergies: allergies ? allergies.split(",").map((a) => a.trim()) : [],
    },
    { new: true, runValidators: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Diagnoses and allergies updated successfully",
        updatedPatient
      )
    );
});

const updatePassword = asyncHandler(async (req, res) => {
  const patientId = req.user._id;

  if (req.role !== "patient") {
    res.status(403);
    throw new ApiError(
      403,
      "Forbidden! Only patients can update their password"
    );
  }

  const { oldPassword, newPassword } = req.body || {};

  if (!oldPassword || !newPassword) {
    res.status(400);
    throw new ApiError(400, "Please provide old and new passwords");
  }

  const patient = await Patient.findById(patientId);
  if (!patient) {
    res.status(404);
    throw new ApiError(404, "Patient not found");
  }

  if (oldPassword === newPassword) {
    res.status(400);
    throw new ApiError(400, "New password must be different from old password");
  }

  const isOldPasswordCorrect = await patient.comparePassword(oldPassword);
  if (!isOldPasswordCorrect) {
    res.status(401);
    throw new ApiError(401, "Old password is incorrect");
  }

  patient.password = newPassword;
  await patient.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, "Password updated successfully", null));
});

const deleteProfile = asyncHandler(async (req, res) => {
  const patientId = req.user._id;

  const patient = await Patient.findById(patientId);
  if (!patient) {
    res.status(404);
    throw new ApiError(404, "Patient not found");
  }

  deleteFromCloudinary(patient.profilePicPublicId).catch((err) => {
    console.error("Error deleting profile pic from Cloudinary:", err);
  });

  const deletedPatient = await Patient.findByIdAndDelete(patientId);

  if (!deletedPatient) {
    res.status(404);
    throw new ApiError(404, "Patient not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Patient deleted successfully", deletedPatient));
});

export {
  registerPatient,
  getPatientById,
  getAllPatients,
  updateProfilePic,
  updateProfile,
  updateMedicalInfo,
  updatePassword,
  deleteProfile,
};
