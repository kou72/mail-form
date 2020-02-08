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
  return "name=" + data.name + ", email=" + data.email + ", message=" + data.message;
});

exports.hello = functions.https.onCall((data, context) => {
  return "hello";
});

exports.sendMail = functions.https.onCall(async (data, context) => {
  // メールフォーマット
  const inquiry = data => {
    return `以下内容でホームページよりお問い合わせを受けました。

お名前：${data.name}

メールアドレス：${data.email}

内容：
${data.message}
`;
  };

  //メール情報の作成
  const contents = {
    from: gmailEmail,
    to: gmailEmail,
    subject: "お問合せフォームからのメッセージ",
    text: inquiry(data)
  };

  // メール送付
  try {
    smtp.sendMail(contents);
  } catch (err) {
    console.error(`send failed. ${err}`);
    throw new functions.https.HttpsError("internal", "send failed.");
  }
});
