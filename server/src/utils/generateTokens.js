import ApiError from "./apiError.js";
import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";

const generateAccessTokenAndRefreshToken = async (userID, role) => {
  const modelMap = {
    patient: Patient,
    doctor: Doctor,
  };

  const Model = modelMap[role];
  if (!Model) {
    throw new ApiError(400, "Invalid role provided for token generation");
  }

  try {
    const user = await Model.findById(userID);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
  }
};

export default generateAccessTokenAndRefreshToken;
