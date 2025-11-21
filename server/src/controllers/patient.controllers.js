import asyncHandler from "../utils/asyncHandler.js";
import Patient from "../models/patient.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

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
    username:username.toLowerCase(),
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

  const createdPatient = await Patient.findById(patient._id).select("-password -refreshToken");

  if (!createdPatient) {
    throw new ApiError(500, "Error creating patient");
  }

  return res.status(201).json(new ApiResponse(201, "Patient registered successfully", createdPatient));
  
});

export { registerPatient };
