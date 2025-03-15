// In src/routes/userPostRoutes.js
import { Router } from "express";
import {
  createUserPost,
  getUserPosts,
  likeUserPost,
  addUserPostComment,
  deleteUserPost,
  getRandomPosts,
  getPostsByTag, // <-- import the new controller
} from "../controllers/userPostController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { uploadImage, uploadVideo } from "../middlewares/upload.js";

const router = Router();

// Create a post
router.post("/create", protect, createUserPost);

// Get all posts by a user
router.get("/user/:userId", protect, getUserPosts);

// Like a post
router.put("/like/:postId", protect, likeUserPost);

// Add a comment to a post
router.put("/comment/:postId", protect, addUserPostComment);

// Delete a post
router.delete("/:postId", protect, deleteUserPost);

// Get random posts
router.get("/random", protect, getRandomPosts);

// <-- New route: Get posts by pet tag
router.get("/tag/:tag", protect, getPostsByTag);

export default router;
