const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  updateProfile,
  deleteUser,
} = require("../controllers/user.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, getAllUsers);

router.get("/:id", getSingleUser);

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

router.delete(
  "/:id",
  authMiddleware,
  deleteUser
);

module.exports = router;