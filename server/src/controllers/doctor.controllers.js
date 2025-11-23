import Doctor from "../models/doctor.model.js";
import Department from "../models/department.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import uploadOnCloudinary, {
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import generateAccessTokenAndRefreshToken from "../utils/generateTokens.js";

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
  const uploadedProfilePic = await uploadOnCloudinary(
    req.file?.path,
    "hospital_management_system/doctors"
  );

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
    profilePic: uploadedProfilePic.url,
    profilePicPublicId: uploadedProfilePic.public_id,
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

const currentDoctorProfile = asyncHandler(async (req, res) => {
  const doctorId = req.user._id;
  const doctor = await Doctor.findById(doctorId).select(
    "-password -refreshToken"
  );
  if (!doctor) {
    res.status(404);
    throw new ApiError(404, "Doctor not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "Doctor profile fetched successfully", doctor));
});

const getDoctorById = asyncHandler(async (req, res) => {
  const doctorId = req.params.id;
  const doctor = await Doctor.findById(doctorId).select(
    "-password -refreshToken"
  );
  if (!doctor) {
    res.status(404);
    throw new ApiError(404, "Doctor not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "Doctor fetched successfully", doctor));
});

const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find().select("-password -refreshToken");

  if (!doctors || doctors.length === 0) {
    res.status(404);
    throw new ApiError(404, "No doctors found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Doctors fetched successfully", doctors));
});

const updateProfilePic = asyncHandler(async (req, res) => {
  const doctorId = req.user._id;

  if (!doctorId) {
    res.status(400);
    throw new ApiError(400, "Doctor ID is required");
  }

  if (!req.file) {
    res.status(400);
    throw new ApiError(400, "Profile picture is required");
  }

  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    res.status(404);
    throw new ApiError(404, "Doctor not found");
  }

  // If old picture exists, delete it from Cloudinary
  if (doctor.profilePicPublicId) {
    try {
      const delResult = await deleteFromCloudinary(doctor.profilePicPublicId);

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
    "hospital_management_system/doctors"
  );

  if (!uploadedProfilePic) {
    res.status(500);
    throw new ApiError(500, "Error uploading profile picture to cloudinary");
  }

  const updatedDoctor = await Doctor.findByIdAndUpdate(
    doctorId,
    {
      profilePic: uploadedProfilePic.url,
      profilePicPublicId: uploadedProfilePic.public_id,
    },
    { new: true, runValidators: false }
  ).select("-password -refreshToken");

  if (!updatedDoctor) {
    res.status(404);
    throw new ApiError(404, "Doctor not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Profile picture updated successfully",
        updatedDoctor
      )
    );
});

const updateProfile = asyncHandler(async (req, res) => {
  const doctorId = req.user._id;

  if (!doctorId) {
    res.status(400);
    throw new ApiError(400, "Doctor ID is required");
  }

  const updateData = req.body;
  const allowedUpdates = [
    "name",
    "mobile_no",
    "email",
    "address",
    "description",
  ];

  if (!updateData || Object.keys(updateData).length === 0) {
    res.status(400);
    throw new ApiError(400, "No data provided for update");
  }

  if (
    !Object.keys(updateData).every((field) => allowedUpdates.includes(field))
  ) {
    res.status(400);
    throw new ApiError(400, "Invalid updates!");
  }

  const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, updateData, {
    new: true,
    runValidators: true,
  }).select("-password -refreshToken");

  if (!updatedDoctor) {
    res.status(404);
    throw new ApiError(404, "Doctor not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Doctor profile updated successfully", updatedDoctor)
    );
});

const updateProfessionProfile = asyncHandler(async (req, res) => {
  const doctorId = req.user._id;

  if (!doctorId) {
    res.status(400);
    throw new ApiError(400, "Doctor ID is required");
  }

  const updateData = req.body;
  const allowedUpdates = [
    "specialization",
    "consultationFee",
    "yearsOfExperience",
    "qualifications",
    "department",
    "availability",
    "status",
  ];

  if (!updateData || Object.keys(updateData).length === 0) {
    res.status(400);
    throw new ApiError(400, "No data provided for update");
  }

  if (
    !Object.keys(updateData).some((field) => allowedUpdates.includes(field))
  ) {
    res.status(400);
    throw new ApiError(400, "Invalid updates!");
  }

  const {
    specialization,
    consultationFee,
    yearsOfExperience,
    qualifications,
    department,
    availability,
    status,
  } = updateData;

  if (!["Active", "Inactive", "On Leave"].includes(status)) {
    res.status(400);
    throw new ApiError(400, "Invalid status value");
  }

  const updatedDoctor = await Doctor.findByIdAndUpdate(
    doctorId,
    {
      specialization: specialization,
      consultationFee: consultationFee,
      yearsOfExperience: yearsOfExperience,
      qualifications: qualifications
        ? qualifications.split(",").map((q) => q.trim())
        : [],
      department: department,
      availability: availability
        ? availability.split(",").map((a) => a.trim())
        : [],
      status: status,
    },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password -refreshToken");

  if (!updatedDoctor) {
    res.status(404);
    throw new ApiError(404, "Doctor profession profile could not be updated");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Doctor profession profile updated successfully",
        updatedDoctor
      )
    );
});

const deleteProfile = asyncHandler(async (req, res) => {
  const doctorId = req.user._id;

  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    res.status(404);
    throw new ApiError(404, "Doctor not found");
  }

  deleteFromCloudinary(doctor.profilePicPublicId).catch((err) => {
    console.error("Error deleting profile pic from Cloudinary:", err);
  });

  const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);

  if (!deletedDoctor) {
    res.status(404);
    throw new ApiError(404, "Doctor not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Doctor deleted successfully", deletedDoctor));
});

export {
  registerDoctor,
  loginDoctor,
  logoutDoctor,
  currentDoctorProfile,
  getDoctorById,
  getAllDoctors,
  updateProfilePic,
  updateProfile,
  updateProfessionProfile,
  deleteProfile,
};
