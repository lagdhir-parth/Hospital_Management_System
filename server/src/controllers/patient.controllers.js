import Patient from "../models/patient.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import generateAccessTokenAndRefreshToken from "../utils/generateTokens.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
};

const registerPatient = asyncHandler(async (req, res) => {
  const {
    name,
    username,
    mobile_no,
    email,
    password,
    age,
    bloodGroup,
    gender,
    diagnoses,
    allergies,
    address,
  } = req.body;

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

  if (
    [
      name,
      username,
      mobile_no,
      email,
      password,
      age,
      bloodGroup,
      gender,
      address,
      diagnoses,
      allergies,
    ].some((field) => field?.trim() === "")
  ) {
    res.status(400);
    throw new ApiError(400, "Please fill all the required fields");
  }

  // check if patient already exists
  const patientExists = await Patient.findOne({ username });
  if (patientExists) {
    res.status(400);
    throw new ApiError(400, "Patient with this username already exists");
  }

  // check for profile pic
  if (!req.file) {
    res.status(400);
    throw new ApiError(400, "Profile picture is required");
  }
  // upload profile pic to cloudinary
  const profilePicUrl = await uploadOnCloudinary(req.file?.path);

  if (!profilePicUrl) {
    res.status(500);
    throw new ApiError(500, "Error uploading profile picture to cloudinary");
  }

  // create new patient
  const patient = await Patient.create({
    name,
    username: username.toLowerCase(),
    mobile_no,
    email,
    password,
    age,
    bloodGroup,
    gender,
    diagnoses: diagnoses ? diagnoses.split(",").map((d) => d.trim()) : [],
    allergies: allergies ? allergies.split(",").map((a) => a.trim()) : [],
    profilePic: profilePicUrl,
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

const loginPatient = asyncHandler(async (req, res) => {
  // retrieve data from frontend (guard against req.body being undefined)
  const { username, password } = req.body ?? {};

  // validate data
  if (!username || !password) {
    res.status(400);
    throw new ApiError(400, "Please provide username and password");
  }

  const user = await Patient.findOne({ username });
  if (!user) {
    res.status(401);
    throw new ApiError(401, "Invalid username");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    res.status(401);
    throw new ApiError(401, "Invalid password");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const loggedInPatient = await Patient.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(200, "Patient logged in successfully", {
        patient: loggedInPatient,
        accessToken,
      })
    );
});

const patientLogout = asyncHandler(async (req, res) => {
  const loggedOutPatient = await Patient.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    { new: true } // to return the updated document
  );
  res
    .status(200)
    .clearCookie("refreshToken", cookieOptions)
    .clearCookie("accessToken", cookieOptions)
    .json(
      new ApiResponse(
        200,
        { loggedOutPatient, role: req.role },
        "Patient logged out successfully"
      )
    );
});

export { registerPatient, loginPatient, patientLogout };
