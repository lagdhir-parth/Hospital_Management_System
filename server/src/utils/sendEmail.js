import nodemailer from "nodemailer";
import asynchandler from "./asyncHandler.js";
import ApiError from "./apiError.js";
import ApiResponse from "./apiResponse.js";

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const envSecure = (process.env.SMTP_SECURE || "").toLowerCase() === "true";
  const secure = port === 465 ? true : port === 587 ? false : envSecure;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;

  if (!host || !user || !pass || !from) {
    throw new ApiError(
      500,
      "SMTP configuration is incomplete. Check SMTP_HOST/USER/PASS/FROM.",
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

const sendEmail = asynchandler(async (req, res) => {
  const { subject, msg } = req.body || {};

  if (!subject || !msg) {
    throw new ApiError(400, "Missing required fields: subject, msg.");
  }

  const mailOptions = {
    from: process.env.SMTP_FROM, // No flexible 'from' for Gmail domain
    to: req.body.to || process.env.SMTP_TO, // Fixed recipient email
    replyTo: req.body.userEmail, // User's email from frontend
    subject,
    html: msg,
  };

  try {
    const transporter = createTransporter();
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).json(new ApiResponse(200, "Email sent successfully"));
  } catch (error) {
    // Log detailed info server-side; return generic error to client
    console.error("Error sending email:", {
      message: error?.message,
      code: error?.code,
      response: error?.response,
    });
    throw new ApiError(
      500,
      "Error sending email. Please verify SMTP settings.",
    );
  }
});

export default sendEmail;
