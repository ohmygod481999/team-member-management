
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'vuongbaolong48@gmail.com',
  from: 'longvuong9901@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);