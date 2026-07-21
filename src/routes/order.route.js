import express from "express";
import orderController from "../controllers/order.controller.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN, ROLE_USER } from "../constants/roles.js";
import orderSchema from "../validations/orderValidation.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.get(
  "/orders",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  orderController.getOrders,
);

router.get(
  "/orders/user",
  auth,
  roleBasedAuth(ROLE_USER),
  orderController.getOrderByUser,
);

router.get(
  "/orders/:id",
  auth,
  roleBasedAuth(ROLE_USER),
  orderController.getOrderById,
);

router.put("/order/:id/cancel", auth, orderController.cancelOrder);

router.delete(
  "/order/:id",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  orderController.deleteOrder,
);

router.post(
  "/order/create",
  auth,
  roleBasedAuth(ROLE_USER),
  validate(orderSchema),
  orderController.createOrder,
);

router.post(
  "/order/:id/payment/khalti",
  auth,
  roleBasedAuth(ROLE_USER),
  orderController.orderPaymentViaKhalti,
);

export default router;
