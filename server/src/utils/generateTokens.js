import ApiError from "./apiError.js";
import Patient from "../models/patient.model.js";

const generateAccessTokenAndRefreshToken = async (patientID) => {
  try {
    const patient = await Patient.findById(patientID);
    const accessToken = patient.generateAccessToken();
    const refreshToken = patient.generateRefreshToken();

    patient.refreshToken = refreshToken;
    await patient.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
  }
};

export default generateAccessTokenAndRefreshToken;