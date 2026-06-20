const Review = require("../models/Review.model");
const Gig = require("../models/Gig.model");
const Order = require("../models/Order.model");

const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const gig = await Gig.findById(req.params.gigId);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found",
      });
    }

    const order = await Order.findOne({
      gig: gig._id,
      client: req.user.id,
      status: "completed",
    });

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "You can review only purchased gigs",
      });
    }

    const existingReview = await Review.findOne({
      gig: gig._id,
      client: req.user.id,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this gig",
      });
    }

    const review = await Review.create({
      gig: gig._id,
      client: req.user.id,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getGigReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      gig: req.params.gigId,
    }).populate("client", "name email");

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createReview,
  getGigReviews,
};