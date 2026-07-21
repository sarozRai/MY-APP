import mongoose from "mongoose";

const ResetPasswordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  token: {
    type: String,
    required: [true, "Token is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    expires: 0,
    default: () => Date.now() + 900000,
  },
});

const ResetPassword = mongoose.model("ResetPassword", ResetPasswordSchema);

export default ResetPassword;
