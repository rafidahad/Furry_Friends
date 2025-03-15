import { Schema, model } from "mongoose";
import { getDhakaTime } from "../utils/index.js";

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: getDhakaTime(),
  },
  updatedAt: {
    type: Date,
    default: getDhakaTime(),
  },
});

const Product = model("Product", productSchema);
export default Product;