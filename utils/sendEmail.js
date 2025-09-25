const nodemailer = require('nodemailer')
require('dotenv').config()

//create function to send email

const sendEmail = async (to, resetToken) => {
  try {
    // create transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER, //user email address,

        pass: process.env.GMAIL_PASS
      }
    })

    // create message
    const message = {
      to,
      subject: 'Password reset',
      html: `
            <p>Your receiving this email beacause you (or someone else) has requested to reset their password.</p>
            <p>Please click on the following link, or paste this into your browser to complete the process:</p>
            <p>http://localhost:3000/reset-password/${resetToken}</p>
            <p>If you did not request this, please ignore this email.</p>
            `
    }

    // send the email
    const info = await transporter.sendMail(message)
    console.log('Email sent', info.messageId)
  } catch (error) {
    console.log(error)
    throw new Error('Email sending failed.')
  }
}

module.exports = sendEmail
