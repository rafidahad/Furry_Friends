// index.js
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // Import cors
import userRouter from "./routes/userRouters.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Mount user routes
app.use("/users", userRouter);
// Mount authentication routes
app.use("/auth", authRouter);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected."))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
