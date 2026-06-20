const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

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

router.post(
  "/login",
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

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

module.exports = router;