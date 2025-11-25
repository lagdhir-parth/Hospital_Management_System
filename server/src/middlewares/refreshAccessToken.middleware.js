import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";
import Admin from "../models/admin.model.js";
import generateAccessTokenAndRefreshToken from "../utils/generateTokens.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
};

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;
  const role = req.params?.role || "patient";

  const modelMap = {
    patient: Patient,
    doctor: Doctor,
    admin: Admin,
  };

  const Model = modelMap[role];

  if (!incomingRefreshToken) {
    res.status(401);
    throw new ApiError(401, "Access Denied: No refresh token provided");
  }

  const decodedtoken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await Model.findById(decodedtoken?._id);

  if (!user || user.refreshToken !== incomingRefreshToken) {
    res.status(401);
    throw new ApiError(401, "Access Denied: Invalid refresh token");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id, role);

  res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(200, "Access token refreshed successfully", {
        accessToken,
        refreshToken,
      })
    );
});

export default refreshAccessToken;
