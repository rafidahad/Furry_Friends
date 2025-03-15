// utils/testEmail.js
import dotenv from "dotenv";
// Adjust the path if .env is in the parent directory
dotenv.config({ path: "../.env" });
import transporter from "./email.js";

async function sendTestEmail() {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "recipient@example.com", // Replace with a valid email address
      subject: "Test Email from Nodemailer",
      text: "Hello, this is a test email.",
    });
    console.log("Email sent:", info.response);
  } catch (err) {
    console.error("Error sending email:", err);
  }
}

sendTestEmail();
