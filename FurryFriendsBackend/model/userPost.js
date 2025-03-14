import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userPostSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: false, default: "" },
    // New field for title
    content: { type: String, required: true },
    petTag: {
      type: String,
      enum: [
        "Dogs",
        "Cats",
        "Fish",
        "Birds",
        "Rabbits",
        "Hamsters",
        "Guinea Pigs",
        "Reptiles",
        "Ferrets",
        "Others",
        "General",
      ],
      default: "General",
    }, // New field for pet tag
    media: { type: String, default: null },
    mediaType: {
      type: String,
      enum: ["text", "image", "video"],
      default: "text",
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default model("UserPost", userPostSchema);
