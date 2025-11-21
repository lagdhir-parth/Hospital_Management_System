import Doctor from "../models/doctor.model.js";
import Department from "../models/department.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import generateAccessTokenAndRefreshToken from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  secure: true,
};

const registerDoctor = asyncHandler(async (req, res) => {
  //retireve data from req.body
  const {
    name,
    username,
    email,
    password,
    specialization,
    qualifications,
    yearsOfExperience,
    mobileNumber,
    consultationFee,
    departmentName,
    description,
    availability,
  } = req.body;

  //validate data
  if (
    [
      name,
      username,
      email,
      password,
      specialization,
      qualifications,
      mobileNumber,
      yearsOfExperience,
      consultationFee,
      description,
      availability,
    ].some((field) => field?.trim() === "")
  ) {
    res.status(400);
    throw new ApiError(400, "Please fill all the required fields");
  }

  //check existed doctor
  const existedDoctor = await Doctor.findOne({ username });
  if (existedDoctor) {
    res.status(400);
    throw new ApiError(400, "Username is already taken");
  }

  const workDepartment = await Department.findOne({ name: departmentName });
  if (!workDepartment) {
    res.status(400);
    throw new ApiError(400, "Invalid department name");
  }

  //validate file
  if (!req.file) {
    res.status(400);
    throw new ApiError(400, "Profile image is required");
  }

  //upload file on cloudinary
  const profilePicUrl = await uploadOnCloudinary(req.file?.path);

  //create new doctor
  const newDoctor = await Doctor.create({
    name,
    username: username.toLowerCase(),
    email,
    password,
    mobileNumber,
    specialization,
    qualifications: qualifications
      ? qualifications.split(",").map((q) => q.trim())
      : [],
    yearsOfExperience,
    consultationFee,
    department: workDepartment._id,
    description,
    availability,
    profilePic: profilePicUrl,
  });

  const createdDoctor = await Doctor.findById(newDoctor._id).select(
    "-password -refreshToken"
  );

  if (!createdDoctor) {
    res.status(500);
    throw new ApiError(500, "Unable to create doctor account");
  }

  res
    .status(201)
    .json(
      new ApiResponse(201, "Doctor registered successfully", createdDoctor)
    );
});

const loginDoctor = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // validate data
  if (!username || !password) {
    res.status(400);
    throw new ApiError(400, "Username and password are required");
  }

  const doctor = await Doctor.findOne({ username });
  if (!doctor) {
    res.status(401);
    throw new ApiError(401, "Invalid username");
  }

  const isPasswordValid = await doctor.comparePassword(password);
  if (!isPasswordValid) {
    res.status(401);
    throw new ApiError(401, "Invalid password");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(doctor._id, "doctor");

  const loggedInDoctor = await Doctor.findById(doctor._id).select(
    "-password -refreshToken"
  );

  res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(200, "Doctor logged in successfully", {
        accessToken,
        refreshToken,
        loggedInDoctor,
      })
    );
});

const logoutDoctor = asyncHandler(async (req, res) => {
  const doctorId = req.user._id;

  const loggedOutDoctor = await Doctor.findByIdAndUpdate(
    doctorId,
    { refreshToken: null },
    {
      new: true,
      runValidators: false,
    }
  );

  res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(
      new ApiResponse(200, "Doctor logged out successfully", loggedOutDoctor)
    );
});

export { registerDoctor, loginDoctor, logoutDoctor };
