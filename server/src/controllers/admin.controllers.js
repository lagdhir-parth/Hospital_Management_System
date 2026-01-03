import Admin from "../models/admin.model.js";
import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";
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
  secure: true,
};

const createAdmin = asyncHandler(async (req, res) => {
  const { name, username, email, password, mobile_no } = req.body;

  if (!name || !username || !email || !password || !mobile_no) {
    fs.unlinkSync(req.file.path);
    res.status(400);
    throw new ApiError(400, "All fields are required");
  }

  const existingAdmin = await Admin.findOne({ username });

  if (existingAdmin) {
    fs.unlinkSync(req.file.path);
    res.status(400);
    throw new ApiError(400, "Admin with this username already exists");
  }

  if (!req.file) {
    res.status(400);
    throw new ApiError(400, "Profile picture is required");
  }

  const profilePic = await uploadOnCloudinary(
    req.file?.path,
    "hospital_management_system/admins",
  );

  if (!profilePic) {
    res.status(500);
    throw new ApiError(500, "Failed to upload profile picture to cloudinary");
  }

  const newAdmin = await Admin.create({
    name,
    username,
    email,
    password,
    mobile_no,
    profilePic: profilePic.url,
    profilePicPublicId: profilePic.public_id,
  });

  const createdAdmin = await Admin.findById(newAdmin._id).select(
    "-password -refreshToken",
  );

  return res
    .status(201)
    .json(new ApiResponse(201, "Admin created successfully", createdAdmin));
});

const getAdminById = asyncHandler(async (req, res) => {
  const { adminId } = req.params;
  if (!adminId) {
    throw new ApiError(400, "Admin ID is required");
  }

  const admin = await Admin.findById(adminId).select("-password -refreshToken");

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Admin retrieved successfully", admin));
});

const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find().select("-password -refreshToken");

  if (admins.length === 0) {
    res.status(404);
    throw new ApiError(404, "No admins found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Admins retrieved successfully", admins));
});

const updateProfilePic = asyncHandler(async (req, res) => {
  if (req.role !== "admin") {
    fs.unlinkSync(req.file.path);

    res.status(403);
    throw new ApiError(
      403,
      "Forbidden! Only admins can update their profile picture",
    );
  }

  const adminId = req.user._id;

  if (!adminId) {
    res.status(400);
    throw new ApiError(400, "Admin ID is required");
  }

  if (!req.file) {
    res.status(400);
    throw new ApiError(400, "Profile picture file is required");
  }

  const admin = await Admin.findById(adminId);
  if (!admin) {
    res.status(404);
    throw new ApiError(404, "Admin not found");
  }

  if (admin?.profilePicPublicId) {
    try {
      const delResult = await deleteFromCloudinary(admin.profilePicPublicId);
      if (!delResult) {
        console.warn(
          "Cloudinary deletion returned unexpected result:",
          delResult,
        );
      }
    } catch (err) {
      console.error("Error deleting old profile pic from Cloudinary:", err);
    }
  }

  const profilePic = await uploadOnCloudinary(
    req.file?.path,
    "hospital_management_system/admins",
  );
  if (!profilePic) {
    res.status(500);
    throw new ApiError(500, "Failed to upload profile picture to cloudinary");
  }

  admin.profilePic = profilePic.url;
  admin.profilePicPublicId = profilePic.public_id;
  await admin.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, "Profile picture updated successfully", admin));
});

const updateProfile = asyncHandler(async (req, res) => {
  if (req.role !== "admin") {
    res.status(403);
    throw new ApiError(403, "Only admins can update their profile");
  }

  const adminId = req.user._id;

  if (!adminId) {
    res.status(400);
    throw new ApiError(400, "Admin ID is required");
  }

  const updates = req.body;
  const allowedUpdates = ["name", "email", "mobile_no"];

  if (!updates || Object.keys(updates).length === 0) {
    res.status(400);
    throw new ApiError(400, "Please provide data to update");
  }

  const isValidOperation = Object.keys(updates).every(
    (update) => allowedUpdates.includes(update) && updates[update] !== "",
  );

  if (!isValidOperation) {
    res.status(400);
    throw new ApiError(400, "Invalid updates!");
  }

  const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updates, {
    new: true,
  }).select("-password -refreshToken");

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Admin profile updated successfully", updatedAdmin),
    );
});

const updatePassword = asyncHandler(async (req, res) => {
  if (req.role !== "admin") {
    res.status(403);
    throw new ApiError(403, "Only admins can update their password");
  }

  const adminId = req.user._id;

  if (!adminId) {
    res.status(400);
    throw new ApiError(400, "Admin ID is required");
  }

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    res.status(400);
    throw new ApiError(400, "Please provide old and new passwords");
  }

  if (oldPassword === newPassword) {
    res.status(400);
    throw new ApiError(400, "New password must be different from old password");
  }

  const admin = await Admin.findById(adminId);
  if (!admin) {
    res.status(404);
    throw new ApiError(404, "Admin not found");
  }

  const isOldPasswordValid = await admin.comparePassword(oldPassword);

  if (!isOldPasswordValid) {
    res.status(401);
    throw new ApiError(401, "Old password is incorrect");
  }

  admin.password = newPassword;
  await admin.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, "Password updated successfully", null));
});

const deleteAdmin = asyncHandler(async (req, res) => {
  if (req.role !== "admin") {
    res.status(403);
    throw new ApiError(403, "Only admins can delete admins");
  }

  const { adminId } = req.params;

  if (!adminId) {
    res.status(400);
    throw new ApiError(400, "Admin ID is required");
  }

  const admin = await Admin.findById(adminId);
  if (!admin) {
    res.status(404);
    throw new ApiError(404, "Admin not found");
  }

  if (admin?.profilePicPublicId) {
    await deleteFromCloudinary(admin.profilePicPublicId);
  }

  const deletedAdmin = await Admin.findByIdAndDelete(adminId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Admin deleted successfully", deletedAdmin));
});

const deleteUserById = asyncHandler(async (req, res) => {
  if (req.role !== "admin") {
    res.status(403);
    throw new ApiError(403, "Only admins can delete users");
  }

  const { userId, role } = req.params;

  const roleModelMap = {
    patient: Patient,
    doctor: Doctor,
  };

  const Model = roleModelMap[role];

  if (!userId) {
    res.status(400);
    throw new ApiError(400, "User ID is required");
  }

  const user = await Model.findById(userId);
  if (!user) {
    res.status(404);
    throw new ApiError(404, "User not found");
  }

  if (user?.profilePicPublicId) {
    await deleteFromCloudinary(user.profilePicPublicId);
  }

  const deletedUser = await Model.findByIdAndDelete(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, "User deleted successfully", deletedUser));
});

export {
  createAdmin,
  getAdminById,
  getAllAdmins,
  updateProfilePic,
  updateProfile,
  updatePassword,
  deleteAdmin,
  deleteUserById,
};
