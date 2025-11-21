import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // Generate 12 random bytes file name:
    crypto.randomBytes(12, (err, bytes) => {
      const filename = bytes.toString("hex") + path.extname(file.originalname);
      cb(null, filename);
    });
  },
});

const upload = multer({
  storage,
  //limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
});

export default upload;
