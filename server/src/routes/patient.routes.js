import {
  registerPatient,
  loginPatient,
  patientLogout,
} from "../controllers/patient.controllers.js";
import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single("profilePic"), registerPatient);

// Support both JSON/x-www-form-urlencoded and multipart/form-data (Postman 'form-data')
// by using multer.none() to parse only fields (no files).
router.route("/login").post(upload.none(), loginPatient);

// Protected routes
router.route("/logout").post(verifyJWT, patientLogout);

export default router;