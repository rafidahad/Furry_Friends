// src/routes/messageRoutes.js
import { Router } from "express";
import {
  sendMessage,
  getMessagesBetween,
} from "../controllers/messageController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

// POST /messages - send a new message
router.post("/", protect, sendMessage);

// GET /messages/conversation/:userId - fetch conversation between the logged-in user and another user
router.get("/conversation/:userId", protect, getMessagesBetween);

export default router;
