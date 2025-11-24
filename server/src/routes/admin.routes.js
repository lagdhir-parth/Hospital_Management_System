import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  createAdmin,
  loginAdmin,
  logoutAdmin,
  getCurrentAdmin,
  getAdminById,
  getAllAdmins,
  updateProfilePic,
  updateProfile,
  updatePassword,
  deleteAdmin,
  deleteUserById,
} from "../controllers/admin.controllers.js";

const router = Router();

router.route("/register").post(upload.single("profilePic"), createAdmin);
router.route("/login").post(upload.none(), loginAdmin);

router.route("/allAdmins").get(getAllAdmins);

// Secure this route further in future (only super admins should be able to delete admins)
router.route("/logout").post(verifyJWT, logoutAdmin);
router.route("/currentAdmin").get(verifyJWT, getCurrentAdmin);
router
  .route("/updateProfilePic")
  .patch(verifyJWT, upload.single("profilePic"), updateProfilePic);

router.route("/updateProfile").patch(verifyJWT, upload.none(), updateProfile);
router.route("/updatePassword").patch(verifyJWT, upload.none(), updatePassword);

router.route("/find/:adminId").get(verifyJWT, getAdminById);
router.route("/delete/:adminId").delete(verifyJWT, deleteAdmin);
router.route("/deleteUser/:role/:userId").delete(verifyJWT, deleteUserById);

export default router;
