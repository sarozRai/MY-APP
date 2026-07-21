import { ORDER_STATUS_CANCELLED } from "../constants/orderStatuses.js";
import { ROLE_ADMIN } from "../constants/roles.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import crypto from "crypto";
import { payViaKhalti } from "../utils/khaltiPayment.js";

const getOrders = async () => {
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .populate("user", "name email")
    .populate(
      "orderItems.product",
      "name category brand price description images quantity",
    );

  return orders;
};

const getOrderByUser = async (userId) => {
  const order = await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("user", "name email")
    .populate(
      "orderItems.product",
      "name category brand price description images quantity",
    );

  return order;
};

const getOrderById = async (id) => {
  const order = await Order.findById(id)
    .populate("user", "name email")
    .populate(
      "orderItems.product",
      "name category brand price description images quantity",
    );

  if (!order)
    throw {
      status: 404,
      message: "Order not found",
    };

  return order;
};

const cancelOrder = async (id, user) => {
  const order = await getOrderById(id);

  if (!user.role.includes(ROLE_ADMIN) && user._id != order.user._id)
    throw {
      status: 403,
      message: "Access Denied",
    };

  return await Order.findByIdAndUpdate(
    id,
    { status: ORDER_STATUS_CANCELLED },
    { new: true },
  )
    .populate("user", "name email")
    .populate(
      "orderItems.product",
      "name category brand price description images quantity",
    );
};

const deleteOrder = async (id) => {
  const deletedOrder = await Order.findByIdAndDelete(id);
  return deletedOrder;
};

const createOrder = async (data, file, userId) => {
  const orderNumber = crypto.randomUUID();

  return await Order.create({
    ...data,
    user: userId,
    orderNumber,
  });
};


const orderPaymentViaKhalti = async (id) => {
  const order = await getOrderById(id);

  const transactionId = crypto.randomUUID();

  const orderPayment = await Payment.create({
    transactionId,
    amount: order.totalPrice,
    method: "ONLINE",
  });

  await Order.findByIdAndUpdate(id, { payment: orderPayment._id });


  return await payViaKhalti({
    amount: order.totalPrice,
    purchaseOrderId: order.orderNumber,
    purchaseOrderName: order.orderItems[0].product.name,
    customer: order.user,
  });
};

export default {
  createOrder,
  getOrders,
  getOrderByUser,
  getOrderById,
  cancelOrder,
  deleteOrder,
  orderPaymentViaKhalti,
};
