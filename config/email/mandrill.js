var nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport('SMTP', {
  service: 'Mandrill',
  auth: {
    user: process.env.MANDRILL_USERNAME,
    pass: process.env.MANDRILL_APIKEY
  }
});
