import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }, // ✅ Only email, no phone number
  passwordHash: { type: String, required: true },
  verified: { type: Boolean, default: false },

  // OTP fields
  otpCode: { type: String, default: null },
  otpExpires: { type: Date, default: null },

  // User details
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  profile: {
    dob: {
      day: Number,
      month: String,
      year: Number,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
    },
    location: String,
    bio: String,
    profilePicture: { type: String, default: "default-profile.png" },
    joinedAt: { type: Date, default: Date.now, immutable: true },
  },

  // ✅ Followers & Following fields
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }], // Users following this user
  following: [{ type: Schema.Types.ObjectId, ref: "User" }], // Users this user follows

  role: { type: String, enum: ["user", "admin"], default: "user" },
  settings: {
    notifications: { type: Boolean, default: true },
  },
});

export default model("User", userSchema);
