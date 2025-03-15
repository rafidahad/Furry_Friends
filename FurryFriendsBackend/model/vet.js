// models/vet.js
import mongoose from "mongoose";

const vetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true, index: "2dsphere" }, // ✅ Ensuring correct index
  },
});

vetSchema.index({ location: "2dsphere" }); // ✅ Ensure the geospatial index is properly set

export default mongoose.model("Vet", vetSchema);
