// ==============================================================================
// DEPENDENCIES
// ==============================================================================
require('dotenv').config();
const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');


// ==============================================================================
// NODEMAILER CONFIGURATION
// ==============================================================================

const auth = {
    auth: {
      api_key: process.env.API_KEY,
      domain: process.env.DOMAIN
    }
  };
  

const transporter = nodemailer.createTransport(mailgun(auth));

// ==============================================================================
// SENDING MAIL
// ==============================================================================

const sendMail = (email, subject, text, cb) => {

    const mailOptions={
        from: email,
        to: 'valuecraftofficial@gmail.com',
        subject: subject,
        text: text
    };
    
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            cb(err, null);
        }
        else{
            cb(err, data);
        }
    });
}

module.exports = sendMail;
