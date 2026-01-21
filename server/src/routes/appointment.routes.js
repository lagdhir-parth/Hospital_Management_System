import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  requestAppointment,
  getAppointmentById,
  getAllAppointments,
  getDoctorSpecificAppointments,
  getPatientSpecificAppointments,
  getDepartmentSpecificAppointments,
  getUserUpcomingAppointments,
  updateStatusById,
  deleteAppointmentById,
} from "../controllers/appointment.controllers.js";

const router = Router();

router
  .route("/requestAppointment")
  .post(verifyJWT, upload.none(), requestAppointment);

router.route("/getAppointment/:id").get(verifyJWT, getAppointmentById);
router.route("/getAllAppointments").get(verifyJWT, getAllAppointments);
router
  .route("/getDoctorSpecificAppointments")
  .get(verifyJWT, getDoctorSpecificAppointments);
router
  .route("/getPatientSpecificAppointments")
  .get(verifyJWT, getPatientSpecificAppointments);
router
  .route("/getDepartmentSpecificAppointments/:departmentId")
  .get(verifyJWT, getDepartmentSpecificAppointments);
router
  .route("/getUserUpcomingAppointments")
  .get(verifyJWT, getUserUpcomingAppointments);
router
  .route("/updateStatus/:appointmentId")
  .patch(verifyJWT, upload.none(), updateStatusById);

router
  .route("/deleteAppointment/:appointmentId")
  .delete(verifyJWT, upload.none(), deleteAppointmentById);

export default router;
