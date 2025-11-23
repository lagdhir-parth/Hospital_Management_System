import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// configure cloudinary once on module load

const uploadOnCloudinary = async (
  localFilePath,
  folderPath = "hospital_management_system"
) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    if (!localFilePath) {
      console.error(
        "local file path must be provided while uploading to Cloudinary"
      );
      return null;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: folderPath,
    });

    // remove local file if it exists
    try {
      if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    } catch (e) {
      console.warn("failed to remove local file:", e);
    }

    return {
      url: response.url,
      public_id: response.public_id,
    };
  } catch (error) {
    try {
      if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    } catch (e) {
      console.warn("failed to remove local file after upload error:", e);
    }
    console.error("Error uploading file to Cloudinary:", error);
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return { result: "Public ID not_found" };

  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    return result;
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };

export default uploadOnCloudinary;
