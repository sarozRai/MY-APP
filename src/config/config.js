import dotenv from "dotenv";

dotenv.config();

const config = {
  appUrl: process.env.APP_URL || "",
  mongodbUrl: process.env.MONGODB_URL,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  khalti: {
    apiUrl: process.env.KHALTI_API_URL || "",
    secret: process.env.KHALTI_SECRET_KEY || "",
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },
  resendApiKey: process.env.RESEND_API_KEY || "",
};

export default config;
