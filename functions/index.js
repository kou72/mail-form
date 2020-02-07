const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

admin.initializeApp();

//SMTPサーバの設定
const smtp = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

exports.echo = functions.https.onCall((data, context) => {
  return data.text;
});

exports.hello = functions.https.onCall((data, context) => {
  return "hello";
});

// Sending the request
exports.sendMail = functions.https.onCall((data, context) => {
  //メール情報の作成
  const message = {
    from: gmailEmail,
    to: gmailEmail,
    subject: "nodemailer test mail",
    text: "テストメールです。"
  };

  // メール送付
  smtp.sendMail(message, (err, info) => {
    if (err) {
      return err;
    } else {
      return "success!";
    }
  });
});
