// model/post.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    default: null,
  },
  content: { type: String, default: "" },
  mediaUrl: { type: String, default: "" },
  type: {
    type: String,
    enum: ["text", "image", "video", "lost-and-found", "pet-adoption", "news"],
    default: "text",
  },
  category: {
    type: String,
    enum: ["general", "lost-and-found", "pet-adoption", "news"],
    default: "general",
  },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  commentsCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Post", postSchema);
