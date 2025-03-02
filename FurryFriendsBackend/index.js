// index.js
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
// You can also mount other routes (e.g., userRoutes) as needed

dotenv.config();
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Mount auth routes
app.use("/auth", authRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected."))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
