import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

/* ===============================
   USER MANAGEMENT
================================ */

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

export const makeAdmin = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.isAdmin = true;
  await user.save();
  res.json({ message: "User promoted to admin" });
};

/* ===============================
   ORDER MANAGEMENT
================================ */

export const getAllOrdersAdmin = async (req, res) => {
  const orders = await Order.find().populate("user", "name email");
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  order.paymentStatus = req.body.status;
  await order.save();
  res.json(order);
};

/* ===============================
   PRODUCT MANAGEMENT
================================ */

export const getAdminProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const updateProductStock = async (req, res) => {
  const product = await Product.findById(req.params.id);
  product.stock = req.body.stock;
  await product.save();
  res.json(product);
};

/* ===============================
   DASHBOARD ANALYTICS
================================ */

export const getDashboardStats = async (req, res) => {
  const usersCount = await User.countDocuments();
  const orders = await Order.find({ paymentStatus: "Paid" });
  const productsCount = await Product.countDocuments();

  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.totalPrice,
    0
  );

  res.json({
    usersCount,
    ordersCount: orders.length,
    productsCount,
    totalRevenue
  });
};

