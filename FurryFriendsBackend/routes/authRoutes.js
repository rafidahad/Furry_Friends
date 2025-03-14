import { Router } from "express";
import {
  signupUser,
  verifyOTP,
  loginUser,
  resetPassword,
  changePassword,
} from "../controllers/authController.js";
import { getProfile } from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js"; // ✅ Import middleware

const router = Router();

router.post("/signup", signupUser);
router.post("/verify-otp", verifyOTP);
router.post("/login", loginUser);
router.post("/reset-password", resetPassword);
router.post("/change-password", changePassword);

// ✅ Protect the /profile route
router.get("/profile", protect, getProfile);

export default router;
