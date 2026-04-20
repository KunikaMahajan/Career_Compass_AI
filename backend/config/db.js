import mongoose from "mongoose";
import env from "./env.js";
console.log("MONGO URI:", env.MONGO_URI);
const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;