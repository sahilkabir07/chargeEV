const Charger = require("../models/charger");

const getChargers = async (req, res) => {
  try {
    const chargers = await Charger.find();
    res.status(200).json(chargers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chargers", error });
  }
};

const createCharger = async (req, res) => {
  const { name, location, status, powerOutput, connectorType } = req.body;

  try {
    const newCharger = new Charger({
      name,
      location,
      status,
      powerOutput,
      connectorType,
    });

    const savedCharger = await newCharger.save();
    res.status(201).json(savedCharger);
  } catch (error) {
    res.status(500).json({ message: "Failed to create charger", error });
  }
};

const updateCharger = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedCharger = await Charger.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCharger) {
      return res.status(404).json({ message: "Charger not found" });
    }

    res.status(200).json(updatedCharger);
  } catch (error) {
    res.status(500).json({ message: "Failed to update charger", error });
  }
};

const deleteCharger = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCharger = await Charger.findByIdAndDelete(id);

    if (!deletedCharger) {
      return res.status(404).json({ message: "Charger not found" });
    }

    res.status(200).json({ message: "Charger deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete charger", error });
  }
};

module.exports = {
  getChargers,
  createCharger,
  updateCharger,
  deleteCharger,
};
