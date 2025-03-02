// model/inquiry.js
const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  question: { type: String, required: true },
  details: { type: String, default: "" },
  category: { type: String, default: "general" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Inquiry", inquirySchema);
