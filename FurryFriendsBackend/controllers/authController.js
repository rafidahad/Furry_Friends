import User from "../model/user.js"; // ✅ Corrected import
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../utils/email.js";
 // ✅ Ensure this is configured
import dotenv from "dotenv";

dotenv.config();

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

/**
 * @route   POST /auth/signup
 * @desc    Register user & send OTP
 */
export const signupUser = async (req, res) => {
  try {
    console.log("Signup request received:", req.body);

    const { username, email, password, firstName, surname } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists." });

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

    // Create new user
    const newUser = new User({
      username,
      email,
      passwordHash,
      firstName,
      surname,
      otpCode,
      otpExpires,
      verified: false, // User is not verified until OTP is confirmed
    });

    await newUser.save();

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otpCode}. It expires in 15 minutes.`,
    });

    res.status(201).json({ message: "Signup successful. OTP sent to email." });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


/**
 * @route   POST /auth/verify-otp
 * @desc    Verify OTP and activate user
 */
export const verifyOTP = async (req, res) => {
  try {
    const { email, otpCode } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otpCode !== otpCode || user.otpExpires < new Date()) {
      return res.status(400).json({ error: "Invalid or expired OTP." });
    }

    // Mark user as verified
    user.verified = true;
    user.otpCode = null;
    user.otpExpires = null;
    await user.save();

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "User verified successfully.", token });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @route   POST /auth/login
 * @desc    Login user & return JWT
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Find user by email
    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({ error: "Invalid email or password." });
    if (!user.verified)
      return res.status(403).json({ error: "Please verify your email first." });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password." });

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      message: "Login successful!",
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @route   POST /auth/reset-password
 * @desc    Send OTP for password reset
 */
export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found." });

    user.otpCode = generateOTP();
    user.otpExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      text: `Use this OTP to reset your password: ${user.otpCode}`,
    });

    res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @route   POST /auth/change-password
 * @desc    Change user password with OTP
 */
export const changePassword = async (req, res) => {
  try {
    const { email, otpCode, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otpCode !== otpCode || user.otpExpires < new Date()) {
      return res.status(400).json({ error: "Invalid or expired OTP." });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    user.otpCode = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
