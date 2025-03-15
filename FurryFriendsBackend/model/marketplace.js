// model/marketplace.js
import mongoose from "mongoose";

const marketplaceSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  images: [String],
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default model("Marketplace", marketplaceSchema);
