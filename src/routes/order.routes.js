const express = require("express");

const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getReceivedOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

// Client Routes
router.post(
  "/:gigId",
  authMiddleware,
  roleMiddleware("client"),
  createOrder
);

router.get(
  "/my-orders",
  authMiddleware,
  roleMiddleware("client"),
  getMyOrders
);

// Freelancer Routes
router.get(
  "/received",
  authMiddleware,
  roleMiddleware("freelancer"),
  getReceivedOrders
);

router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("freelancer"),
  updateOrderStatus
);

module.exports = router;