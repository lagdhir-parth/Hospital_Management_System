import Doctor from "../models/doctor.model.js";
import Department from "../models/department.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

const createDepartment = asyncHandler(async (req, res) => {
  const { name, description, headOfDepartmentUsername, location, contactNumber } =
    req.body;

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
    headOfDepartment = doctor._id;
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
      new ApiResponse(201, "Department created successfully", newDepartment)
    );
});

export { createDepartment };