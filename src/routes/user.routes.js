const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  updateProfile,
  deleteUser,
} = require("../controllers/user.controller");

const authMiddleware = require("../middleware/auth.middleware");

// Get All Users
router.get("/", getAllUsers);

// Get Single User
router.get("/:id", getSingleUser);

// Update Logged-in User Profile
router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

// Delete User
router.delete(
  "/:id",
  authMiddleware,
  deleteUser
);

module.exports = router;