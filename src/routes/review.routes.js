const express = require("express");

const router = express.Router();

const {
  createReview,
  getGigReviews,
} = require("../controllers/review.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

router.post(
  "/:gigId",
  authMiddleware,
  roleMiddleware("client"),
  createReview
);

router.get(
  "/gig/:gigId",
  getGigReviews
);

module.exports = router;