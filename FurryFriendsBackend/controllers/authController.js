// controllers/authController.js
import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../utils/email.js";
import dotenv from "dotenv";

dotenv.config();

// Helper: generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// POST /auth/signup
export const signupUser = async (req, res) => {
  try {
    const {
      emailOrPhone,
      password,
      firstName,
      surname,
      day,
      month,
      year,
      gender,
      location, // optional
      bio, // optional
      profilePicture, // optional
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ emailOrPhone });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create the new user (unverified)
    const newUser = new User({
      emailOrPhone,
      passwordHash,
      firstName,
      surname,
      profile: {
        dob: { day: Number(day), month, year: Number(year) },
        gender,
        location: location || "",
        bio: bio || "",
        profilePicture: profilePicture || "",
      },
      verified: false,
    });

    // Generate OTP and set expiration (15 minutes from now)
    const otp = generateOTP();
    newUser.otpCode = otp;
    newUser.otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Save the user
    await newUser.save();

    // Send OTP via email (assuming emailOrPhone is an email address)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: emailOrPhone,
      subject: "Your OTP Code for FurryFriends",
      text: `Your verification code is: ${otp}`,
    });

    return res
      .status(201)
      .json({ message: "Signup successful. OTP sent via email." });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST /auth/verify-otp
export const verifyOTP = async (req, res) => {
  try {
    const { emailOrPhone, otpCode } = req.body;
    const user = await User.findOne({ emailOrPhone });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Validate OTP and check expiration
    if (
      user.otpCode !== otpCode ||
      !user.otpExpires ||
      user.otpExpires < new Date()
    ) {
      return res.status(400).json({ error: "Invalid or expired OTP." });
    }

    // Mark user as verified and clear OTP fields
    user.verified = true;
    user.otpCode = null;
    user.otpExpires = null;
    await user.save();

    return res.status(200).json({ message: "User verified successfully." });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST /auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // 'email' corresponds to emailOrPhone in our model

    // Find the user
    const user = await User.findOne({ emailOrPhone: email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Ensure user is verified
    if (!user.verified) {
      return res
        .status(403)
        .json({ error: "User not verified. Please verify OTP." });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Generate JWT token
    const payload = { id: user._id, email: user.emailOrPhone, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
