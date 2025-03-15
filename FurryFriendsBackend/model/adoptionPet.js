import mongoose from "mongoose";

const adoptionPetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["Dog", "Cat", "Bird", "Rabbit", "Fish", "Other"],
      required: true,
    },
    age: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true }, // We'll store the Cloudinary URL
    reason: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Adopted"],
      default: "Available",
    },
  },
  { timestamps: true }
);

export default mongoose.model("AdoptionPet", adoptionPetSchema);
