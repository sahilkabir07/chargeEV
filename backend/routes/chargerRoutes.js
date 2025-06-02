const express = require("express");
const {
  getChargers,
  createCharger,
  updateCharger,
  deleteCharger,
} = require("../controllers/chargerController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getChargers);
router.route("/").post(protect, admin, createCharger);
router.route("/:id").put(protect, admin, updateCharger);
router.route("/:id").delete(protect, admin, deleteCharger);

module.exports = router;
