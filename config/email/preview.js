var nodemailer = require('nodemailer');
var path = require('path');
require('mail-preview');

var tmpdir = path.join(process.cwd(), 'tmp', 'email');

module.exports = nodemailer.createTransport('MailPreview', {
  dir: tmpdir,  // defaults to ./tmp/nodemailer
  browser: true // open sent email in browser (defaults to true)
});
