import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { createBill, updatePayment, getBillById, deleteBill } from "../controllers/bill.controllers.js";

const router = Router();

router.route("/createBill").post(upload.none(), createBill);
router.route("/getBill/:id").get(getBillById);
router.route("/updatePayment").patch(upload.none(), updatePayment);
router.route("/deleteBill/:id").delete(verifyJWT, deleteBill);

export default router;