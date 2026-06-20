const Gig = require("../models/Gig.model");

const createGig = async (req, res) => {
  try {
    const { title, description, price, category, tags, image } = req.body;

    const gig = await Gig.create({
      title,
      description,
      price,
      category,
      tags,
      image,
      freelancer: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Gig created successfully",
      gig,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllGigs = async (req, res) => {
  try {
    const { search, category, sort } = req.query;

    let query = {};

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    let gigsQuery = Gig.find(query).populate(
      "freelancer",
      "name email role"
    );

    if (sort === "low") {
      gigsQuery = gigsQuery.sort({ price: 1 });
    }

    if (sort === "high") {
      gigsQuery = gigsQuery.sort({ price: -1 });
    }

    const gigs = await gigsQuery;

    res.status(200).json({
      success: true,
      count: gigs.length,
      gigs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate(
      "freelancer",
      "name email role"
    );

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found",
      });
    }

    res.status(200).json({
      success: true,
      gig,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found",
      });
    }

    if (gig.freelancer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const updatedGig = await Gig.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Gig updated successfully",
      gig: updatedGig,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found",
      });
    }

    if (gig.freelancer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await gig.deleteOne();

    res.status(200).json({
      success: true,
      message: "Gig deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({
      freelancer: req.user.id,
    });

    res.status(200).json({
      success: true,
      count: gigs.length,
      gigs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createGig,
  getAllGigs,
  getSingleGig,
  updateGig,
  deleteGig,
  getMyGigs,
};