const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection error", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
