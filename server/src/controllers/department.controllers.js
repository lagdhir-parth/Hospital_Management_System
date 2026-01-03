import Doctor from "../models/doctor.model.js";
import Department from "../models/department.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

const createDepartment = asyncHandler(async (req, res) => {
  if (req.role !== "admin") {
    res.status(403);
    throw new ApiError(
      403,
      "Forbidden: You don't have permission to perform create action",
    );
  }

  const {
    name,
    description,
    headOfDepartmentUsername,
    location,
    contactNumber,
  } = req.body;

  if ([name, description, location].some((field) => field?.trim() === "")) {
    res.status(400);
    throw new ApiError(400, "Please fill all the required fields");
  }

  const existingDepartment = await Department.findOne({ name });
  if (existingDepartment) {
    res.status(400);
    throw new ApiError(400, "Department with this name already exists");
  }

  let headOfDepartment = undefined;

  if (headOfDepartmentUsername) {
    const doctor = await Doctor.findOne({ username: headOfDepartmentUsername });
    if (!doctor) {
      res.status(400);
      throw new ApiError(400, "Invalid head of department username");
    }
    headOfDepartment = doctor;
  }

  const newDepartment = await Department.create({
    name,
    description,
    headOfDepartment: headOfDepartment ? headOfDepartment : null,
    location,
    contactNumber: contactNumber ? contactNumber : null,
  });

  res
    .status(201)
    .json(
      new ApiResponse(201, "Department created successfully", newDepartment),
    );
});

const getAllDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find().populate(
    "headOfDepartment",
    "name username email", //only bring these three fields from the Doctor document
  );

  res
    .status(200)
    .json(
      new ApiResponse(200, "Departments fetched successfully", departments),
    );
});

const getDepartmentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const department = await Department.findById(id).populate(
    "headOfDepartment",
    "name username email",
  );

  if (!department) {
    res.status(404);
    throw new ApiError(404, "Department not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Department fetched successfully", department));
});

const updateDepartmentById = asyncHandler(async (req, res) => {
  if (req.role !== "admin") {
    res.status(403);
    throw new ApiError(
      403,
      "Forbidden: You don't have permission to perform deletion action",
    );
  }

  const { id } = req.params;
  const {
    name,
    description,
    headOfDepartment,
    contactNumber,
    location,
    status,
  } = req.body;

  if (name) {
    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment && existingDepartment._id.toString() !== id) {
      res.status(400);
      throw new ApiError(400, "Department with this name already exists");
    }
  }

  if (!["active", "inactive"].includes(status)) {
    res.status(400);
    throw new ApiError(400, "Invalid status value");
  }

  const department = await Department.findByIdAndUpdate(
    id,
    {
      name,
      description,
      headOfDepartment,
      contactNumber,
      location,
      status,
    },
    {
      new: true,
    },
  );

  if (!department) {
    res.status(404);
    throw new ApiError(404, "Department not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Department updated successfully", department));
});

const deleteDepartmentById = asyncHandler(async (req, res) => {
  if (req.role !== "admin") {
    res.status(403);
    throw new ApiError(
      403,
      "Forbidden: You don't have permission to perform deletion action",
    );
  }

  const { id } = req.params;

  const department = await Department.findByIdAndDelete(id);
  if (!department) {
    res.status(404);
    throw new ApiError(404, "Department not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Department deleted successfully", department));
});

export {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartmentById,
};
