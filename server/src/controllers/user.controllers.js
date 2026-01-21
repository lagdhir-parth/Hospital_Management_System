import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import Doctor from "../models/doctor.model.js";
import Patient from "../models/patient.model.js";
import Admin from "../models/admin.model.js";
import generateAccessTokenAndRefreshToken from "../utils/generateTokens.js";

const cookieOptions = {
  httpOnly: true,
  secure: true, // REQUIRED for mobile
  sameSite: "None", // REQUIRED for mobile
  maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
};

const loginUser = asyncHandler(async (req, res) => {
  const { username, password, role } = req.body;

  const roleMap = {
    admin: Admin,
    patient: Patient,
    doctor: Doctor,
  };

  const Model = roleMap[role.toLowerCase()];

  if (!Model) {
    res.status(400);
    throw new ApiError(400, "Invalid role specified");
  }

  // validate data
  if (!username || !password) {
    res.status(400);
    throw new ApiError(400, "Username and password are required");
  }

  const user = await Model.findOne({ username });
  if (!user) {
    res.status(401);
    throw new ApiError(401, `This ${role.toLowerCase()} does not exist`);
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    res.status(401);
    throw new ApiError(401, "Invalid password");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id, role.toLowerCase());

  const loggedInUser = await Model.findById(user._id).select(
    "-password -refreshToken",
  );

  const loggedInUserData = { ...loggedInUser._doc, role: role.toLowerCase() };

  res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(200, "User logged in successfully", {
        accessToken,
        refreshToken,
        loggedInUserData,
      }),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const role = req.role;
  const roleMap = {
    admin: Admin,
    patient: Patient,
    doctor: Doctor,
  };

  const Model = roleMap[role.toLowerCase()];

  const loggedOutUser = await Model.findByIdAndUpdate(
    userId,
    { refreshToken: null },
    {
      new: true,
      runValidators: false,
    },
  );

  res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, "User logged out successfully", loggedOutUser));
});

const currentUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const role = req.role;
  const roleMap = {
    admin: Admin,
    patient: Patient,
    doctor: Doctor,
  };

  const Model = roleMap[role.toLowerCase()];

  let user = await Model.findById(userId).select("-password -refreshToken");

  // Populate department for doctors only
  if (role.toLowerCase() === "doctor") {
    user = await Model.findById(userId)
      .select("-password -refreshToken")
      .populate("department");
  }

  if (!user) {
    res.status(404);
    throw new ApiError(404, "User not found");
  }

  const userData = { ...user._doc, role: req.role };

  return res
    .status(200)
    .json(new ApiResponse(200, "Current user fetched successfully", userData));
});

export { loginUser, logoutUser, currentUser };
