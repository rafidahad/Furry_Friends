// utils/email.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // e.g. yourapp@gmail.com
    pass: process.env.EMAIL_PASS, // app password or real password
  },
});

export default transporter;
