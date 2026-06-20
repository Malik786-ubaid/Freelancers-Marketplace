const User = require("../models/User.model");
const Gig = require("../models/Gig.model");
const Order = require("../models/Order.model");
const Review = require("../models/Review.model");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalClients = await User.countDocuments({
      role: "client",
    });

    const totalFreelancers = await User.countDocuments({
      role: "freelancer",
    });

    const totalGigs = await Gig.countDocuments();

    const totalOrders = await Order.countDocuments();

    const totalReviews = await Review.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalClients,
        totalFreelancers,
        totalGigs,
        totalOrders,
        totalReviews,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRevenue = async (req, res) => {
  try {
    const completedOrders = await Order.find({
      freelancer: req.user.id,
      status: "completed",
    });

    const revenue = completedOrders.reduce(
      (total, order) => total + order.price,
      0
    );

    res.status(200).json({
      success: true,
      totalCompletedOrders: completedOrders.length,
      revenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("client", "name email")
      .populate("gig", "title")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRecentReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("client", "name email")
      .populate("gig", "title")
      .sort({ createdAt: -1 })
      .limit(5);

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
  getDashboardStats,
  getRevenue,
  getRecentOrders,
  getRecentReviews,
};