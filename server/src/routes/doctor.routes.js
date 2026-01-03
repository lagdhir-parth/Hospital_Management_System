import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  registerDoctor,
  getDoctorById,
  getAllDoctors,
  updateProfilePic,
  updateProfile,
  updateProfessionProfile,
  updatePassword,
  deleteProfile,
} from "../controllers/doctor.controllers.js";

const router = Router();

router.route("/register").post(upload.single("profilePic"), registerDoctor);

router.route("/find/:id").get(getDoctorById);
router.route("/allDoctors").get(getAllDoctors); //secure route - only accessible to authenticated doctors

//secure route - only accessible to authenticated doctors
router
  .route("/updateProfilePic")
  .patch(verifyJWT, upload.single("profilePic"), updateProfilePic);

router.route("/updateProfile").patch(verifyJWT, upload.none(), updateProfile);

router
  .route("/updateProfessionProfile")
  .patch(verifyJWT, upload.none(), updateProfessionProfile);

router.route("/updatePassword").patch(verifyJWT, upload.none(), updatePassword);

router.route("/deleteProfile").delete(verifyJWT, deleteProfile);

export default router;
