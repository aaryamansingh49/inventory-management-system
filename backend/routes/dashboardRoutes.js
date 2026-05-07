const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
  getDashboardStats,
  getRecentOrders,
  getRecentPurchases,
  getLowStockProducts
} = require("../controllers/dashboardController");

router.get("/stats", authMiddleware, getDashboardStats);
router.get("/recent-orders", authMiddleware, getRecentOrders);
router.get("/recent-purchases", authMiddleware, getRecentPurchases);
router.get("/low-stock",authMiddleware,getLowStockProducts);

module.exports = router;
