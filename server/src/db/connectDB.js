import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MongoDB_URI}/${process.env.DB_NAME}`,
    );

    console.log(
      `MongoDB Connected !!! DB Host: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
