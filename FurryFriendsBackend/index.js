// index.js
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userPostRoutes from "./routes/userPostRoutes.js";
import vetRoutes from './routes/vetRoutes.js'; // <-- new
import messageRoutes from "./routes/messageRoutes.js"; // <-- new
import userRoutes from "./routes/userRouters.js";
// You can also mount other routes (e.g., userRoutes) as needed

dotenv.config();
const app = express();

// Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

// Mount auth routes
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);
app.use("/posts", userPostRoutes); 
app.use('/vets', vetRoutes); // <-- new
app.use("/messages", messageRoutes);
app.use("/api/users", userRoutes);
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected."))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
