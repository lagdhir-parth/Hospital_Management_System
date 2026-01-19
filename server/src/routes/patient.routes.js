import {
  registerPatient,
  getPatientById,
  getAllPatients,
  updateProfilePic,
  updateProfile,
  updateMedicalInfo,
  updatePassword,
  deleteProfile,
} from "../controllers/patient.controllers.js";
import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single("profilePic"), registerPatient);

// Support both JSON/x-www-form-urlencoded and multipart/form-data (Postman 'form-data')
// by using multer.none() to parse only fields (no files).

// Place specific routes before parameterized routes so they are matched first
router.route("/allPatients").get(getAllPatients);
router.route("/find/:id").get(getPatientById); // put in under all patients route otherwise 'allPatients' is treated as id

// Protected routes

router
  .route("/updateProfilePic")
  .patch(verifyJWT, upload.single("profilePic"), updateProfilePic);

router.route("/updateProfile").patch(verifyJWT, upload.none(), updateProfile);

router
  .route("/updateMedicalInfo")
  .patch(verifyJWT, upload.none(), updateMedicalInfo);

router.route("/updatePassword").patch(verifyJWT, upload.none(), updatePassword);
router.route("/deleteProfile").delete(verifyJWT, deleteProfile);

export default router;
