import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { registerDoctor, loginDoctor, logoutDoctor } from "../controllers/doctor.controllers.js";

const router = Router();

router.route("/register").post(upload.single("profilePic"), registerDoctor);

router.route("/login").post(upload.none(), loginDoctor);

//secure route - only accessible to authenticated doctors
router.route("/logout").post(verifyJWT, logoutDoctor);

export default router;
