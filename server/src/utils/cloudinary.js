import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    if (!localFilePath) {
      console.error(
        "local file path must required while uploading on cloudinary"
      );
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    //console.log("file is uploaded on cloudinary", response.url);
    fs.unlinkSync(localFilePath); // delete the local file after upload
    return response.url;
  } catch (error) {
    fs.unlinkSync(localFilePath); // delete the local file in case of error
    console.error("Error uploading file to Cloudinary:", error);
    return null;
  }
};

export default uploadOnCloudinary;
