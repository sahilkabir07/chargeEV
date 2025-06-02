const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config");
const userRoutes = require("./routes/userRoutes");
const chargerRoutes = require("./routes/chargerRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const serverless = require("serverless-http");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/chargers", chargerRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("hii..");
});

module.exports.handler = serverless(app);
