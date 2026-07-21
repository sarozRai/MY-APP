import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import config from "./config.js";

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

const storage = multer.memoryStorage();

export const upload = multer({ storage });
export { cloudinary };
