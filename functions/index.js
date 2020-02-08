const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

admin.initializeApp();

// TODO
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });

//SMTPサーバの設定
const smtp = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// メールフォーマット
const inquiry = data => {
  return `以下内容でホームページよりお問い合わせを受けました。

【お名前】
${data.name}

【メールアドレス】
${data.email}

【内容】
${data.message}`;
};

// TODO
//exports.sendMail = functions.https.onCall(async (data, context) => {
//  //メール情報の作成
//  const contents = {
//    from: gmailEmail,
//    to: gmailEmail,
//    subject: "お問合せフォームからのメッセージ",
//    text: inquiry(data)
//  };

//  // メール送付
//  try {
//    smtp.sendMail(contents);
//  } catch (err) {
//    console.error(`send failed. ${err}`);
//    throw new functions.https.HttpsError("internal", "send failed.");
//  }
//});

// TODO
//exports.storeMail = functions.firestore.document("mailForm/{Id}").onCreate(async (snap, context) => {
//  //メール情報の作成
//  const contents = {
//    from: gmailEmail,
//    to: gmailEmail,
//    subject: "お問合せフォームからのメッセージ",
//    text: inquiry(snap.data())
//  };

//  // メール送付
//  try {
//    smtp.sendMail(contents);
//  } catch (err) {
//    console.error(`send failed. ${err}`);
//  }
//});
