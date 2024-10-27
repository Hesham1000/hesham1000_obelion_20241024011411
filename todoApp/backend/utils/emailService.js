// todoApp/backend/utils/emailService.js

const nodemailer = require('nodemailer');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todoApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-email-password', // Replace with your email password
  },
});

async function sendConfirmationEmail(to, subject, text) {
  try {
    const mailOptions = {
      from: 'your-email@gmail.com', // Replace with your email
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

async function sendPasswordResetEmail(to, subject, text) {
  try {
    const mailOptions = {
      from: 'your-email@gmail.com', // Replace with your email
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
}

module.exports = {
  sendConfirmationEmail,
  sendPasswordResetEmail,
};
