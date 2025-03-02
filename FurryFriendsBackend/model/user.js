// model/user.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  emailOrPhone: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  verified: { type: Boolean, default: false },

  // Fields for OTP-based verification
  otpCode: { type: String, default: null },
  otpExpires: { type: Date, default: null },

  // Additional fields
  firstName: String,
  surname: String,
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
});

export default model("User", userSchema);
