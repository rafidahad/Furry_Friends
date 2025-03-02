// testEmail.js
import dotenv from 'dotenv';
dotenv.config(); // Ensure your .env file is loaded

import nodemailer from 'nodemailer';

// Create a transporter using your email credentials
const transporter = nodemailer.createTransport({
  service: 'gmail', // Change this if you're using a different email service
  auth: {
    user: process.env.EMAIL_USER,       // Your email address, e.g., yourapp@gmail.com
    pass: process.env.EMAIL_PASS,       // Your email password or App Password
  },
});

async function sendTestEmail() {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,       // Sender address
      to: 'rafidahad123@gmail.com',        // Replace with a valid recipient email address
      subject: 'Test Email from Nodemailer',
      text: 'Hello, this is a test email sent from Nodemailer!',
      // Optionally add an HTML body:
      // html: '<p>Hello, this is a test email sent from <strong>Nodemailer</strong>!</p>',
    });
    console.log('Email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendTestEmail();
