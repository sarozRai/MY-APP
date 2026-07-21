import mongoose from "mongoose";
import { required } from "zod/mini";

const paymentSchema = new mongoose.Schema({
  transactionId: String,
  amount: {
    type: Number,
    required: [true, "Payment amount is required"],
  },
  method: {
    type: String,
    enum: ["CARD", "ONLINE", "CASH"],
  },
  status: {
    type: String,
    default: "PENDING",
    enum: ["PENDING", "SUCCESS", "FAILED"],
  },
});

const model = mongoose.model("Payment", paymentSchema);

export default model;
