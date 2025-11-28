import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import {
  createPrescription,
  getPrescriptionsByAppointment,
  updatePrescription,
  deletePrescription,
} from "../controllers/prescription.controllers.js";

const router = Router();

router.route("/createPrescription").post(verifyJWT, upload.none(), createPrescription);
router.route("/:appointmentId").get(getPrescriptionsByAppointment);
router
  .route("/:prescriptionId")
  .patch(verifyJWT, upload.none(), updatePrescription)
  .delete(verifyJWT, deletePrescription);

export default router;
