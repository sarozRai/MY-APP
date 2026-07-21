import mongoose, { mongo } from "mongoose";
import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_SHIPPED,
} from "../constants/orderStatuses.js";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: [true, "Product is required"],
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  shippingAddress: {
    country: {
      type: String,
      default: "Nepal",
    },
    province: {
      type: String,
      required: [true, "Province is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    street: String,
  },
  status: {
    type: String,
    default: "PENDING",
    enum: [
      ORDER_STATUS_PENDING,
      ORDER_STATUS_CONFIRMED,
      ORDER_STATUS_SHIPPED,
      ORDER_STATUS_DELIVERED,
      ORDER_STATUS_CANCELLED,
    ],
  },
  totalPrice: {
    type: Number,
    required: [true, "Total Price is required"],
  },
  orderNumber: {
    type: String,
    required: [true, "Order number is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  payment: {
    type: mongoose.Schema.ObjectId,
    ref: "Payment",
  },
});

const model = mongoose.model("Order", orderSchema);

export default model;
