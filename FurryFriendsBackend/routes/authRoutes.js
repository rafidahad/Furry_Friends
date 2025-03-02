// routes/authRoutes.js
import { Router } from "express";
import { signupUser, verifyOTP, loginUser } from "../controllers/authController.js";

const router = Router();

router.post("/signup", signupUser);
router.post("/verify-otp", verifyOTP);
router.post("/login", loginUser);

export default router;
