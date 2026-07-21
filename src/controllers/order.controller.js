import orderService from "../services/order.service.js";

const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders();
    return res.send(orders);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getOrderByUser = async (req, res) => {
  try {
    const order = await orderService.getOrderByUser(req.user._id);
    return res.send(order);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    return res.send(order);
  } catch (error) {
    return res.status(error.status || 400).send(error.message);
  }
};

const cancelOrder = async (req, res) => {
  try {
    const cancelledOrder = await orderService.cancelOrder(
      req.params.id,
      req.user,
    );
    return res.send(cancelledOrder);
  } catch (error) {
    return res.status(error.status || 400).send(error.message);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await orderService.deleteOrder(req.params.id);
    return res.send(deletedOrder);
  } catch (error) {
    return res.status(error.status || 400).send(error.message);
  }
};

const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body, req.user._id);
    return res.send(order);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const orderPaymentViaKhalti = async (req, res) => {
  try {
    const response = await orderService.orderPaymentViaKhalti(req.params.id);
    return res.send(response);
  } catch (error) {
    return res.status(400).send(error.message);
  }
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
