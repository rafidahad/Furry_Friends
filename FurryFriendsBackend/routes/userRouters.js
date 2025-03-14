import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js"; // ✅ Protect routes

const router = Router();

// ✅ Signup a new user (PUBLIC)
router.post("/", createUser);

// ✅ Fetch all users (ADMIN ONLY - Implement Role-based access later)
router.get("/", protect, getAllUsers);

// ✅ Fetch a single user by ID (PRIVATE)
router.get("/:id", protect, getUserById);

// ✅ Update authenticated user's profile (PRIVATE)
router.put("/profile", protect, updateUser); // 🔹 Changed from "/:id" to "/profile"

// ✅ Delete authenticated user (PRIVATE)
router.delete("/:id", protect, deleteUser);

export default router;
