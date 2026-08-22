import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the product name"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please enter the product category"],
      enum: [
        "Smartphones",
        "Laptops",
        "Audio",
        "Wearables",
        "Accessories",
        "Gaming",
        "Tablets",
        "Cameras",
      ],
    },
    brand: {
      type: String,
      required: [true, "Please enter the product brand"],
      enum: ["Apple", "Samsung", "OnePlus", "Sony", "Dell", "Logitech", "Vivo", "Xiaomi", "Realme"],
    },
    price: {
      type: Number,
      required: [true, "Please enter the product price"],
      min: [0, "Price cannot be a negative value"],
      default: 0.0,
    },
    stock: {
      type: Number,
      required: [true, "Please enter the product stock quantity"],
      min: [0, "Stock cannot be a negative value"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please enter the product description"],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be greater than 5"],
    },
    imageUrl: {
      type: [String],
      required: [true, "Please provide at least one product image"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
