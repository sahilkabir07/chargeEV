const mongoose = require("mongoose");

const chargerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    powerOutput: { type: Number, required: true },
    connectorType: { type: String, required: true },
  },
  { timestamps: true }
);

const Charger = mongoose.model("Charger", chargerSchema);

module.exports = Charger;
