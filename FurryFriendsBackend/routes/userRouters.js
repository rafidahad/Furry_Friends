// routes/userRouters.js
import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";

const router = Router();

// POST /users - Signup endpoint
router.post("/", createUser);

// GET /users - Fetch all users
router.get("/", getAllUsers);

// GET /users/:id - Fetch a single user
router.get("/:id", getUserById);

// PUT /users/:id - Update user data
router.put("/:id", updateUser);

// DELETE /users/:id - Delete user
router.delete("/:id", deleteUser);

export default router;
