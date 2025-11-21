import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
); // to enable CORS, which allows controlled access to resources located outside of a given domain.
app.use(express.json({ limit: "16kb" })); // to parse JSON data
app.use(express.urlencoded({ extended: true })); // to retrive data from URL
app.use(cookieParser()); // to parse OR CRUD operations of cookies
app.use(express.static("public")); // to serve static files such as images, CSS files, and JavaScript files

// Importing routes
import patientRouter from "./routes/patient.routes.js";

// Mounting routes
app.use("/api/patients", patientRouter);


export default app;
