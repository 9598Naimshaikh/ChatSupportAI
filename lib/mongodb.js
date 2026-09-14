import mongoose from "mongoose";
import dns from "dns";

dns.setServers([
  "1.1.1.1",
  "8.8.8.8",
]);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env.local");
};

const cached = global.mongoose || {
  conn: null,
  promise: null,
};

global.mongoose = cached;

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connected successfully");

    return cached.conn;
  } catch (error) {
    cached.promise = null;

    console.error("MongoDB connection error:", error.message);

    throw error;
  }
}

export default connectDB;