// models/petShop.js
import mongoose from "mongoose";

const petShopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true, index: "2dsphere" },
  },
});

petShopSchema.index({ location: "2dsphere" }); // Ensure geospatial index

export default mongoose.model("PetShop", petShopSchema);
