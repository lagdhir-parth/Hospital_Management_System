import {Router} from "express";
import {createDepartment} from "../controllers/department.controllers.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create").post(upload.none(), createDepartment);

export default router;