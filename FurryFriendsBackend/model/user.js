import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    verified: { type: Boolean, default: false },

    // ✅ OTP fields for authentication
    otpCode: { type: String, default: null },
    otpExpires: { type: Date, default: null },

    // ✅ User Profile Details
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    profile: {
      dob: {
        day: { type: Number, required: true },
        month: { type: String, required: true },
        year: { type: Number, required: true },
      },
      gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
      },
      bio: { type: String, default: "" },
      profilePicture: { type: String, default: "default-profile.png" },
    },

    // ✅ Followers & Following relationships
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],

    // ✅ Added posts field (for linking user posts)
    posts: [{ type: Schema.Types.ObjectId, ref: "UserPost" }],

    role: { type: String, enum: ["user", "admin"], default: "user" },
    settings: {
      notifications: { type: Boolean, default: true },
    },
    messages: [
      {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default model("User", userSchema);
