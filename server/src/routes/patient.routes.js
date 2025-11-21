import { registerPatient } from "../controllers/patient.controllers.js";
import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
    upload.single("profilePic"),
    registerPatient
);

export default router;