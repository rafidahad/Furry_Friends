// model/lostAndFound.js
const mongoose = require("mongoose");

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

module.exports = mongoose.model("LostAndFound", lostAndFoundSchema);
