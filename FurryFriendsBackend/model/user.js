// model/user.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true }, // New username field
  emailOrPhone: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  verified: { type: Boolean, default: false },

  // OTP fields
  otpCode: { type: String, default: null },
  otpExpires: { type: Date, default: null },

  // Additional fields
  firstName: { type: String, required: true },
  surname: { type: String, required: true },

  profile: {
    dob: {
      day: Number,
      month: String,
      year: Number,
    },
    gender: String,
    location: String,
    bio: String,
    profilePicture: String,
    joinedAt: { type: Date, default: Date.now, immutable: true },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  settings: {
    notifications: { type: Boolean, default: true },
  },
});

export default model("User", userSchema);
