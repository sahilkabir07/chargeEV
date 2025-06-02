const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config");
const userRoutes = require("./routes/userRoutes");
const chargerRoutes = require("./routes/chargerRoutes");
require("dotenv").config();
const bookingRoutes = require("./routes/bookingRoutes");
const serverless = require("serverless-http");
const app = express();

app.use(cors());
app.use(express.json());

connectDB();
app.use("/", (req, res) => {
  res.send("hii..");
});
app.use("/api/users", userRoutes);
app.use("/api/chargers", chargerRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
module.exports.handler = serverless(app);
