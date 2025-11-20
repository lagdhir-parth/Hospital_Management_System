import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";

dotenv.config({ path: "./.env" });

connectDB();

app.get("/", (req, res) => {
  res.send("Hello world!!");
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port :", process.env.PORT);
});
