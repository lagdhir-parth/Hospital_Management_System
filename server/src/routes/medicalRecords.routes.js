import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import {
  createMedicalRecord,
  deleteMedicalRecord,
  getUserMedicalRecords,
  getAllMedicalRecords,
} from "../controllers/medicalRecord.controllers.js";

const router = Router();

router
  .route("/:appointmentId/createMedicalRecord")
  .post(verifyJWT, createMedicalRecord);

router.route("/userRecords").get(verifyJWT, getUserMedicalRecords);

router.route("/allMedicalRecords").get(verifyJWT, getAllMedicalRecords);

router.route("/:medicalRecordId/delete").delete(verifyJWT, deleteMedicalRecord);

export default router;
