import { cloudinary } from "../config/cloudinary.js";

const FOLDER_NAME = "SAROZ-E-COMMERCE";

const uploadFile = async (fileBuffer) => {
  return await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: FOLDER_NAME,
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [{ width: 800, height: 800, crop: "limit" }],
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      },
    );

    uploadStream.end(fileBuffer);
  });
};

export { uploadFile };
