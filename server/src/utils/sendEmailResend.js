import { Resend } from "resend";
import asyncHandler from "./asyncHandler.js";
import ApiResponse from "./apiResponse.js";
import ApiError from "./apiError.js";

const sendEmailResend = asyncHandler(async (req, res) => {
  const { subject, msg, userEmail } = req.body;

  if (!subject || !msg) {
    throw new ApiError(400, "Subject and message are required");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  if (!process.env.RESEND_API_KEY) {
    throw new ApiError(500, "RESEND_API_KEY is missing");
  }

  await resend.emails.send({
    from: `HMS <${process.env.EMAIL_FROM}>`, // Must be verified in Resend
    to: process.env.EMAIL_TO, // For custom 'to', you need to verify the recipient email in Resend or use a domain you own.
    replyTo: userEmail,
    subject,
    html: msg,
  });

  return res.status(200).json(new ApiResponse(200, "Email sent successfully"));
});

export default sendEmailResend;
