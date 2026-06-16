const Order = require("../models/Order.model");
const Gig = require("../models/Gig.model");

// Create Order
const createOrder = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found",
      });
    }

    if (gig.freelancer.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot purchase your own gig",
      });
    }

    const order = await Order.create({
      gig: gig._id,
      client: req.user.id,
      freelancer: gig.freelancer,
      price: gig.price,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Client Orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      client: req.user.id,
    })
      .populate("gig")
      .populate("freelancer", "name email");

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

// Freelancer Orders
const getReceivedOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      freelancer: req.user.id,
    })
      .populate("gig")
      .populate("client", "name email");

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

// Update Status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (
      order.freelancer.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    order.status =
      req.body.status || order.status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getReceivedOrders,
  updateOrderStatus,
};