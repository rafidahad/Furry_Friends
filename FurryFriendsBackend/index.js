import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userPostRoutes from "./routes/userPostRoutes.js";
import vetRoutes from "./routes/vetRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRouters.js";
import adoptionRoutes from "./routes/adoptionRoutes.js"; // ✅ Added adoption route

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Routes
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);
app.use("/posts", userPostRoutes);
app.use("/vets", vetRoutes);
app.use("/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/adoption", adoptionRoutes); // ✅ Register adoption route

// Health Check Route (Useful for debugging)
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "API is running!" });
});

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully."))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
