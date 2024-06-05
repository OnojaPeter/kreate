const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.TRANSPORTER_USER, // Your email address from .env
    pass: process.env.TRANSPORTER_PASS  // Your email password from .env
  }
});

module.exports = transporter;