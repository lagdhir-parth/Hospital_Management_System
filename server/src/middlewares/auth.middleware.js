import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";

const roleModelMap = {
  patient: Patient,
  doctor: Doctor,
};

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401);
    throw new ApiError(
      401,
      "Access Denied: Unauthorized access, No Token Provided"
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const { _id, role } = decoded || {};

    const Model = roleModelMap[role];
    
    if (!Model) {
      res.status(401);
      throw new ApiError(401, "Access Denied: Invalid Token role");
    }

    const user = await Model.findById(decoded?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      res.status(401);
      throw new ApiError(401, "Access Denied: Invalid Token");
    }

    req.user = user;
    req.role = role;
    next();
  } catch (err) {
    res.status(401);
    throw new ApiError(401, "Access Denied: Invalid Token");
  }
});

export default verifyJWT;
