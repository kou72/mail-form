const functions = require("firebase-functions");
const admin = require("firebase-admin");
const address = functions.config().gmail.address;
const { google } = require("googleapis");

admin.initializeApp();

// TODO.07
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
//   console.log("console messages");
// });

//SMTPサーバの設定
// const smtp = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: gmailEmail,
//     pass: gmailPassword,
//   },
// });

// メールフォーマット
// const inquiry = (data) => {
//   return `以下内容でホームページよりお問い合わせを受けました。

// 【お名前】
// ${data.name}

// 【メールアドレス】
// ${data.email}

// 【内容】
// ${data.message}`;
// };

// TODO.10-1
// exports.sendMail = functions.https.onCall(async (data, context) => {
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

// TODO.14-1
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

const credentialsJson = require("./credentials.json");
const tokenJson = require("./token.json");
const createAuth = (credentials, token) => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  oAuth2Client.setCredentials(token);
  return oAuth2Client;
};

exports.sendMail = functions.https.onRequest((request, response) => {
  const auth = createAuth(credentialsJson, tokenJson);
  const gmail = google.gmail({ version: "v1", auth });
  const email = [
    `Content-Type: text/plain; charset=\"UTF-8\"\n`,
    `MIME-Version: 1.0\n`,
    `Content-Transfer-Encoding: 7bit\n`,
    `to: ${address} \n`,
    `subject: test \n\n`,
    `test massage`,
  ].join("");
  const base64EncodedEmail = new Buffer(email).toString("base64").replace(/\+/g, "-").replace(/\//g, "_");
  gmail.users.messages.send(
    {
      userId: "me",
      resource: {
        raw: base64EncodedEmail,
      },
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      console.log(res.data);
      response.send("send mail!");
    }
  );
});
