import User from "../model/user.js"; // ✅ Corrected import
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../utils/email.js";
import cloudinary from "../utils/cloudinary.js";
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

    const {
      username,
      firstName,
      surname,
      email,
      password,
      bio,
      profilePicture,
      gender,
      dob,
    } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      firstName,
      surname,
      email,
      passwordHash,
      profile: {
        dob: {
          day: Number(dob.day),
          month: dob.month,
          year: Number(dob.year),
        },
        gender,
        bio,
        profilePicture,
      },
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ message: "Signup successful!", token });
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
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found." });

    // Generate new OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.otpCode = otpCode;
    user.otpExpires = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 mins
    await user.save();

    // Send new OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your New OTP Code",
      text: `Your new OTP code is: ${otpCode}. It expires in 15 minutes.`,
    });

    res.status(200).json({ message: "New OTP sent successfully!" });
  } catch (error) {
    console.error("Resend OTP Error:", error);
    res.status(500).json({ error: "Failed to resend OTP." });
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
