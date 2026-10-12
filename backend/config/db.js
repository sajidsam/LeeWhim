const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

/**
 * Enterprise MongoDB Atlas Connection Manager with Serverless Connection Caching
 * Reuses existing active connections across Vercel function invocations
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI || mongoURI.includes("<CLUSTER_HOST>")) {
    console.warn("⚠️ Warning: MONGODB_URI contains placeholder or is missing.");
    return null;
  }

  // If already connected and ready, return existing connection immediately
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: process.env.DB_NAME || "rongon_db",
      bufferCommands: false, // Prevents queries from hanging for 10s if connection is establishing
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
      maxPoolSize: 10,
    };

    cached.promise = mongoose.connect(mongoURI, opts).then((conn) => {
      console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
      return conn;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  if (cached) cached.conn = null;
  console.warn("⚠️ MongoDB disconnected. Attempting to reconnect...");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

module.exports = connectDB;
