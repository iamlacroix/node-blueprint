var nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport('Sendmail', '/usr/sbin/sendmail');
