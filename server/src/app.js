import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";

const app = express();

// Security middleware
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message:
      "Too many requests from this IP, please try again after a 15 minute break",
  }),
);

// Middleware setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // to allow requests from specified origins
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
); // to enable CORS, which allows controlled access to resources located outside of a given domain.
app.use(express.json({ limit: "16kb" })); // to parse JSON data
app.use(express.urlencoded({ extended: true })); // to retrive data from URL
app.use(cookieParser()); // to parse OR CRUD operations of cookies
app.use(express.static("public")); // to serve static files such as images, CSS files, and JavaScript files
app.use(compression()); // to compress response bodies for all request that traverse through the middleware

// Importing routes
import userRouter from "./routes/user.routes.js";
import patientRouter from "./routes/patient.routes.js";
import doctorRouter from "./routes/doctor.routes.js";
import departmentRouter from "./routes/department.routes.js";
import adminRouter from "./routes/admin.routes.js";
import appointmentRouter from "./routes/appointment.routes.js";
import prescriptionRouter from "./routes/prescription.routes.js";
import medicalRecordRouter from "./routes/medicalRecords.routes.js";
import billRouter from "./routes/bill.routes.js";
import refreshAccessToken from "./middlewares/refreshAccessToken.middleware.js";
import upload from "./middlewares/multer.middleware.js";
import sendEmail from "./utils/sendEmail.js";
import sendEmailResend from "./utils/sendEmailResend.js";

// Mounting routes
app.use("/api/auth", userRouter);
app.use("/api/patients", patientRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/departments", departmentRouter);
app.use("/api/admins", adminRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/prescriptions", prescriptionRouter);
app.use("/api/medicalRecords", medicalRecordRouter);
app.use("/api/bills", billRouter);

app.get("/api/refresh-token", refreshAccessToken);
app.post("/api/send-email", upload.none(), async (req, res) => {
  const { userEmail, subject, msg, to } = req.body || {};
  req.body = {
    userEmail,
    subject: `HMS Contact: ${subject}`,
    msg,
    to,
  };
  sendEmail(req, res);
});
app.post("/api/send-email-resend", upload.none(), sendEmailResend);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Global error:", err.stack || err.message);

  // ✅ Handle your ApiError
  if (err.name === "ApiError") {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [],
      ...(err.data && { data: err.data }),
    });
  }

  // ✅ Handle validation errors (if using express-validator)
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message:
        "Validation failed. Required fields might be missing or incorrect.",
      errors: err.errors,
    });
  }

  // ✅ Handle Mongoose errors
  if (err.name === "MongoError" || err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Duplicate field value entered",
    });
  }

  // Generic server errors
  res.status(500).json({
    success: false,
    message: "Something went wrong! Please try again later.",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export default app;
