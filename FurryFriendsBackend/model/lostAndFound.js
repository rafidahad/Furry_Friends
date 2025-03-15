// model/lostAndFound.js
import mongoose from "mongoose";

const lostAndFoundSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  petDetails: {
    petName: String,
    petType: String,
    description: String,
    lastSeen: String,
  },
  contactInfo: {
    email: String,
    phone: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export default model("LostAndFound", lostAndFoundSchema);
