import express from "express";
import productController from "../controllers/product.controller.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import auth from "../middlewares/auth.js";
import { ROLE_ADMIN, ROLE_MERCHANT } from "../constants/roles.js";
import { upload } from "../config/cloudinary.js";
import validate from "../middlewares/validate.js";
import productSchema from "../validations/productValidation.js";

const router = express.Router();
router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductById);

router.post(
  "/products",
  auth,
  roleBasedAuth(ROLE_MERCHANT),
  upload.single("image"),
  validate(productSchema),
  productController.createProduct,
);

router.put(
  "/products/:id",
  auth,
  roleBasedAuth(ROLE_MERCHANT),
  productController.updateProduct,
);

router.delete(
  "/products/:id",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  productController.deleteProduct,
);

export default router;
