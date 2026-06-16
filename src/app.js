const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const gigRoutes = require("./routes/gig.routes");
const orderRoutes = require("./routes/order.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Freelancer Marketplace API Running",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/orders", orderRoutes);

module.exports = app;