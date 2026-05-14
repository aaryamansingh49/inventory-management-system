const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
  getDashboardStats,
  getRecentOrders,
  getRecentPurchases,
  getLowStockProducts,
  getSalesAnalytics
} = require("../controllers/dashboardController");

router.get("/stats", authMiddleware, getDashboardStats);
router.get("/recent-orders", authMiddleware, getRecentOrders);
router.get("/recent-purchases", authMiddleware, getRecentPurchases);
router.get("/low-stock",authMiddleware,getLowStockProducts);
router.get(
  "/sales-analytics",
  authMiddleware,
  getSalesAnalytics
);

module.exports = router;
