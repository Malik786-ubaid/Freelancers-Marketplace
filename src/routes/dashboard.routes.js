const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
  getRevenue,
  getRecentOrders,
  getRecentReviews,
} = require("../controllers/dashboard.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.get(
  "/stats",
  authMiddleware,
  getDashboardStats
);

router.get(
  "/revenue",
  authMiddleware,
  getRevenue
);

router.get(
  "/recent-orders",
  authMiddleware,
  getRecentOrders
);

router.get(
  "/recent-reviews",
  authMiddleware,
  getRecentReviews
);

module.exports = router;