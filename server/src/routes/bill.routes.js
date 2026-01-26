import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  createBill,
  updatePayment,
  getBillById,
  getUserBills,
  getAllBills,
  deleteBill,
} from "../controllers/bill.controllers.js";

const router = Router();

router.route("/createBill").post(upload.none(), createBill);
router.route("/getBill/:id").get(getBillById);
router.route("/getUserBills").get(verifyJWT, getUserBills);
router.route("/getAllBills").get(verifyJWT, getAllBills);
router.route("/updatePayment").patch(upload.none(), updatePayment);
router.route("/deleteBill/:id").delete(verifyJWT, deleteBill);

export default router;
