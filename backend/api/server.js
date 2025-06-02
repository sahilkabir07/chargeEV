const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
require("dotenv").config();

const { connectDB } = require("../config/config");
const userRoutes = require("../routes/userRoutes");
const chargerRoutes = require("../routes/chargerRoutes");
const bookingRoutes = require("../routes/bookingRoutes");

const app = express();

app.use(
  cors({
    origin: "https://charge-ev-eqhf.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.use("/users", userRoutes);
app.use("/chargers", chargerRoutes);
app.use("/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("Hello!");
});

module.exports = app;
module.exports.handler = serverless(app);
