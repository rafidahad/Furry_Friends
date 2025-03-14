import { Router } from "express";
import {
  signupUser,
  verifyOTP,
  loginUser,
  resetPassword,
  changePassword,
  resendOTP,
} from "../controllers/authController.js";
import { updateUser } from "../controllers/userControllers.js";
import { getProfile } from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js"; // ✅ Import middleware

const router = Router();

router.post("/signup", signupUser);
router.post("/verify-otp", verifyOTP);
router.post("/login", loginUser);
router.post("/reset-password", resetPassword);
router.post("/change-password", changePassword);
router.post("/resend-otp", resendOTP);

// ✅ Protect the /profile route
router.put("/profile", protect, updateUser); // ✅ Correct route definition
router.get("/profile", protect, getProfile); // ✅ Add this line

export default router;
