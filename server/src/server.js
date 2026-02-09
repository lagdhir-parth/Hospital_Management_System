import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  });
