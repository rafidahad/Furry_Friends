// model/petAdoption.js
const mongoose = require("mongoose");

const petAdoptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  petDetails: {
    petName: String,
    petType: String,
    age: Number,
    breed: String,
    description: String,
    images: [String],
  },
  contactInfo: {
    email: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PetAdoption", petAdoptionSchema);
