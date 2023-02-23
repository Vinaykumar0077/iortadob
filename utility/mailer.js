const nodemailer = require("nodemailer");
const { GMAILPASSWORD } = require("../config/index");

exports.mailer = async (email, subject, message) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: "dumyacount007@gmail.com", pass: GMAILPASSWORD },
  });
  let details = {
    from: "dumyacount@gmail.com",
    to: email,
    subject,
    html: message,
  };

  mailTransporter.sendMail(details, (err) => {
    if (err) throw err;
  });
};
