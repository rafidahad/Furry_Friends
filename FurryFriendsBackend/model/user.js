import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }, // ✅ Email only (No phone)
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
      day: { type: Number, required: true },
      month: { type: String, required: true },
      year: { type: Number, required: true },
    },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    bio: { type: String, default: "" },
    profilePicture: { type: String, default: "default-profile.png" },
  },

  // Followers & Following
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],

  role: { type: String, enum: ["user", "admin"], default: "user" },
  settings: {
    notifications: { type: Boolean, default: true },
  },
});

export default model("User", userSchema);
