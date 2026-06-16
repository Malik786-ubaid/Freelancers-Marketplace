const express = require("express");

const router = express.Router();

const {
  createGig,
  getAllGigs,
  getSingleGig,
  updateGig,
  deleteGig,
  getMyGigs,
} = require("../controllers/gig.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

router.get(
  "/my-gigs/all",
  authMiddleware,
  roleMiddleware("freelancer"),
  getMyGigs
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("freelancer"),
  createGig
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("freelancer"),
  updateGig
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("freelancer"),
  deleteGig
);

router.get("/", getAllGigs);

router.get("/:id", getSingleGig);

module.exports = router;