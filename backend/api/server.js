const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
require("dotenv").config();

const { connectDB } = require("../config");
const userRoutes = require("../routes/userRoutes");
const chargerRoutes = require("../routes/chargerRoutes");
const bookingRoutes = require("../routes/bookingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/chargers", chargerRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/api", (req, res) => {
  res.send("Hello!");
});

module.exports = app;
module.exports.handler = serverless(app);
