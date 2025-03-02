// model/vet.js
const mongoose = require("mongoose");

const vetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, default: "" },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: "2dsphere",
    },
  },
  services: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Vet", vetSchema);
