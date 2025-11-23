import { Router } from "express";
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartmentById,
} from "../controllers/department.controllers.js";
import upload from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/allDepartments").get(getAllDepartments);
router.route("/find/:id").get(getDepartmentById);

// Secure Routes:
router.route("/create").post(verifyJWT, upload.none(), createDepartment);
router.route("/delete/:id").delete(verifyJWT, deleteDepartmentById);
router.route("/update/:id").put(verifyJWT, upload.none(), updateDepartmentById);
export default router;
