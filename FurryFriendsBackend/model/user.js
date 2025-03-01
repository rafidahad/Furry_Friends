// model/user.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  profile: {
    bio: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    joinedAt: { type: Date, default: Date.now },
    location: { type: String, default: "" },
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
