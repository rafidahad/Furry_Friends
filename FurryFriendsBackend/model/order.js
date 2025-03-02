// model/order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Marketplace",
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ["pending", "shipped", "delivered", "canceled"],
    default: "pending",
  },
  orderedAt: { type: Date, default: Date.now },
  quantity: { type: Number, default: 1 },
  totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
