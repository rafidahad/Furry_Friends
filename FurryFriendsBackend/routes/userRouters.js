import { Router } from "express";
import {
  createUser,


  updateUser,
  deleteUser,
  getUserProfile,
  toggleFollow,
} from "../controllers/userControllers.js"; // ensure these names match
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

// Public route for signup
router.post("/", createUser);



// IMPORTANT: Place the specific profile route *before* the generic :id route
router.get("/profile/:username", protect, getUserProfile);



// Update & delete routes
router.put("/profile", protect, updateUser);
router.delete("/:id", protect, deleteUser);

// Follow/unfollow route
router.post("/follow/:id", protect, toggleFollow);

export default router;
