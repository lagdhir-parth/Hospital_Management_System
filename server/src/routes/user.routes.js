import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  loginUser,
  logoutUser,
  currentUser,
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/login").post(upload.none(), loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/currentUser").get(verifyJWT, currentUser);

export default router;
