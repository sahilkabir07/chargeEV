const express = require("express");
const {
  bookSlot,
  getMyBookings,
  cancelBooking,
  getBookingsByStation,
} = require("../controllers/bookingController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, bookSlot);
router.get("/mybookings", protect, getMyBookings);
router.delete("/:id", protect, cancelBooking);

router.get("/station/:stationId", protect, admin, getBookingsByStation);

module.exports = router;
