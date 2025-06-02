require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user");
const Charger = require("./models/charger");

const users = [
  {
    username: "admin",
    email: "admin@example.com",
    password: "123456",
  },
];

const chargers = [
  {
    name: "Station One",
    location: { latitude: 28.6139, longitude: 77.209 },
    status: "Active",
    powerOutput: 50,
    connectorType: "Type 2",
  },
  {
    name: "Station Two",
    location: { latitude: 19.076, longitude: 72.8777 },
    status: "Inactive",
    powerOutput: 120,
    connectorType: "CCS",
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await User.deleteMany();
    await Charger.deleteMany();

    for (const user of users) {
      await User.create(user);
    }

    await Charger.insertMany(chargers);

    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
