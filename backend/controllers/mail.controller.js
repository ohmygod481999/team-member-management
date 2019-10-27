
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const from = "vuongbaolong48@gmail.com";

exports.send = msg => {
    if (msg.from == undefined) msg.from = from
    sgMail.send(msg)
}

const msg = {
  to: 'vuongbaolong48@gmail.com',
  from: 'dmlocdmloc@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

sgMail.send(msg);