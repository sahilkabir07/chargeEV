const Booking = require("../models/bookingModel");

exports.bookSlot = async (req, res) => {
  const { charger, timeSlot } = req.body;

  if (!charger || !timeSlot) {
    return res
      .status(400)
      .json({ message: "Charger and time slot are required" });
  }

  const booking = await Booking.create({
    user: req.user._id,
    charger,
    timeSlot,
  });

  res.status(201).json(booking);
};

exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate(
    "charger"
  );
  res.json(bookings);
};

exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  if (booking.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await booking.remove();
  res.json({ message: "Booking cancelled" });
};

exports.getBookingsByStation = async (req, res) => {
  const bookings = await Booking.find({
    charger: req.params.stationId,
  }).populate("user");
  res.json(bookings);
};
