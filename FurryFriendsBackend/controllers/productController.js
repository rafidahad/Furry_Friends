import { Types } from "mongoose";
import Product from "../model/petaccessories.js";
import asyncHandler from "../utils/asynchandler.js";
import { BadRequestError } from "../utils/errors.js";
import SSLCommerzPayment from "sslcommerz-lts";
import axios from "axios";
import Order from "../model/order.js";

const SSL_IS_SANDBOX = process.env.SSL_IS_SANDBOX === "true";
const SSL_STORE_NAME = process.env.SSL_STORE_NAME;
const SSL_STORE_ID = process.env.SSL_STORE_ID;
const SSL_TRANSACTION_API = process.env.SSL_TRANSACTION_API;
const SSL_VALIDATION_API = process.env.SSL_VALIDATION_API;
const SSL_STORE_PASSWORD = process.env.SSL_STORE_PASSWORD;
const API_BASE_URL = process.env.API_BASE_URL;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .select({ __v: 0, createdAt: 0, updatedAt: 0 })
    .sort({ createdAt: -1 });
  return res.status(200).json(products);
});

export const createProduct = asyncHandler(async (req, res) => {
  const { name, price } = req.body;
  try {
    const newProduct = await Product.create({ productName: name, price });
    return res
      .status(201)
      .json({ message: "Product created", data: newProduct });
  } catch (err) {
    console.error(err);
    throw new BadRequestError("Product creation failed");
  }
});

export const purchaseProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId).select({
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  });

  if (!product) {
    throw new BadRequestError("Product not found");
  }

  const tranId = new Types.ObjectId().toString();
  const data = {
    total_amount: product.price,
    currency: "BDT",
    tran_id: tranId,
    success_url: `${API_BASE_URL}/products/payment-success/${tranId}`,
    fail_url: `${API_BASE_URL}/products/payment-fail/${tranId}`,
    cancel_url: `${API_BASE_URL}/products/payment-cancel/${tranId}`,
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "John Doe",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  const sslcz = new SSLCommerzPayment(
    SSL_STORE_ID,
    SSL_STORE_PASSWORD,
    SSL_IS_SANDBOX
  );
  sslcz
    .init(data)
    .then(async (apiResponse) => {
      let gatewayPageURL = apiResponse.GatewayPageURL;
      const newOrder = await Order.create({
        transactionId: tranId,
        productId: product._id,
        status: "pending",
      });
      return res.status(200).json({ paymentUrl: gatewayPageURL });
    })
    .catch((error) => {
      console.error(error);
      throw new BadRequestError("Payment initiation failed");
    });
});

export const successPayment = asyncHandler(async (req, res) => {
  const { tranId } = req.params;
  await Order.findOneAndUpdate(
    { transactionId: tranId },
    { status: "success" }
  );
  return res.redirect(`${ALLOWED_ORIGIN}/payment-success`);
});

export const cancelPayment = asyncHandler(async (req, res) => {
  const { tranId } = req.params;
  await Order.findOneAndUpdate({ transactionId: tranId }, { status: "cancel" });
  return res.redirect(`${ALLOWED_ORIGIN}/payment-cancel`);
});

export const failPayment = asyncHandler(async (req, res) => {
  const { tranId } = req.params;
  await Order.findOneAndUpdate({ transactionId: tranId }, { status: "fail" });
  return res.redirect(`${ALLOWED_ORIGIN}/payment-fail`);
});

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .select({ __v: 0, createdAt: 0 })
    .sort({ createdAt: -1 });
  return res.status(200).json(orders);
});