const express = require("express");
const { body } = require("express-validator");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

// Login rate limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});

// Register
router.post(
  "/register",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required"),

    body("email")
      .isEmail()
      .withMessage("Valid email is required"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

    body("role")
      .isIn(["client", "freelancer"])
      .withMessage("Role must be client or freelancer"),
  ],
  validate,
  registerUser
);

// Login
router.post(
  "/login",
  loginLimiter,
  [
    body("email")
      .isEmail()
      .withMessage("Valid email is required"),

    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ],
  validate,
  loginUser
);

// Profile
router.get(
  "/profile",
  authMiddleware,
  getProfile
);

module.exports = router;