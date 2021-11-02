const nodemailer = require("nodemailer");

const templates = require("./templates");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

const sendMail = (options) => {
  let mailOptions = {
    from: "valananto134@gmail.com",
    to: options.to,
    subject: options.subject,
    html: templates[options.template](options.name, options.code),
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) console.log(err.message);
  });
};

module.exports = sendMail;
