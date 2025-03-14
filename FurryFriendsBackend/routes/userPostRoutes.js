import { Router } from "express";
import {
  createUserPost,
  getUserPosts,
  likeUserPost,
  addUserPostComment,
} from "../controllers/userPostController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { uploadImage, uploadVideo } from "../middlewares/upload.js";
import { deleteUserPost } from "../controllers/userPostController.js";

const router = Router();

// ✅ Create a post (text + optional image/video)
router.post("/create", protect, createUserPost);



// ✅ Get all posts by a user
router.get("/user/:userId", protect, getUserPosts);

// ✅ Like a post
router.put("/like/:postId", protect, likeUserPost);

// ✅ Add a comment to a post
router.put("/comment/:postId", protect, addUserPostComment);
router.delete("/:postId", protect, deleteUserPost);

export default router;
