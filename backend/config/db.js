const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

/**
 * Enterprise MongoDB Atlas Connection Manager
 * Handles connection pooling, connection retry, and lifecycle events
 */
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI || mongoURI.includes("<CLUSTER_HOST>")) {
      console.warn("⚠️ Warning: MONGODB_URI contains placeholder or is missing.");
      console.warn("👉 Please set your actual MongoDB Atlas cluster host in backend/.env");
    }

    const conn = await mongoose.connect(mongoURI, {
      dbName: process.env.DB_NAME || "rongon_db",
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected. Attempting to reconnect...");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

module.exports = connectDB;
