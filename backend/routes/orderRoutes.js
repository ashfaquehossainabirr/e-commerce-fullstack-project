import express from "express";
import Order from "../models/Order.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= CREATE ORDER ================= */
router.post("/", protect, async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    totalPrice,
  });

  res.status(201).json(order);
});

/* ================= ADMIN: GET ALL ORDERS ================= */
router.get("/", protect, admin, async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(orders);
});

export default router;