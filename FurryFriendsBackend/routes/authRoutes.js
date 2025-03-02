// routes/authRoutes.js
import { Router } from "express";
import {
  signupUser,
  verifyOTP,
  loginUser,
} from "../controllers/authController.js";

const router = Router();

// Signup (Generates OTP and sends email)
router.post("/signup", signupUser);

// Verify OTP
router.post("/verify-otp", verifyOTP);

// Login (Requires user to be verified)
router.post("/login", loginUser);

export default router;
