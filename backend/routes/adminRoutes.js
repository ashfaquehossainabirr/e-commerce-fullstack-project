import express from "express";
import {
  getAllUsers,
  deleteUser,
  makeAdmin,
  getAllOrdersAdmin,
  updateOrderStatus,
  getAdminProducts,
  updateProductStock,
  getDashboardStats
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

/* USERS */
router.get("/users", protect, admin, getAllUsers);
router.delete("/users/:id", protect, admin, deleteUser);
router.put("/users/:id/make-admin", protect, admin, makeAdmin);

/* ORDERS */
router.get("/orders", protect, admin, getAllOrdersAdmin);
router.put("/orders/:id/status", protect, admin, updateOrderStatus);

/* PRODUCTS */
router.get("/products", protect, admin, getAdminProducts);
router.put("/products/:id/stock", protect, admin, updateProductStock);

/* DASHBOARD */
router.get("/stats", protect, admin, getDashboardStats);

export default router;