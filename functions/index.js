const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { google } = require("googleapis");

admin.initializeApp();

// TODO.07
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
//   console.log("console messages");
// });

// OAuthクライアントを作成
const createAuth = (credentials, token) => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  oAuth2Client.setCredentials(token);
  return oAuth2Client;
};

// メールフォーマット
const inquiry = (data) => {
  return `以下内容でホームページよりお問い合わせを受けました。

【お名前】
${data.name}

【メールアドレス】
${data.email}

【内容】
${data.message}`;
};

// Email作成(email RFC 5322 フォーマット)
const createEmail = (data) => {
  const email = [
    `Content-Type: text/plain; charset=\"UTF-8\"\n`,
    `MIME-Version: 1.0\n`,
    `Content-Transfer-Encoding: 7bit\n`,
    `to: ${toAddress} \n`,
    `subject: Message from ${process.env.GCP_PROJECT} \n\n`,
    `${inquiry(data)}`,
  ].join("");
  return (base64EncodedEmail = new Buffer(email).toString("base64").replace(/\+/g, "-").replace(/\//g, "_"));
};

// TODO.15-1
// // 環境変数、json ファイル読み込み
// const toAddress = functions.config().to.address;
// const credentialsJson = require("./credentials.json");
// const tokenJson = require("./token.json");

// exports.sendMail = functions.https.onCall(async (data, context) => {
//   // メール情報の作成
//   const auth = createAuth(credentialsJson, tokenJson);
//   const gmail = google.gmail({ version: "v1", auth });
//   const email = createEmail(data);

//   // メール送付
//   try {
//     gmail.users.messages.send({
//       userId: "me",
//       resource: {
//         raw: email,
//       },
//     });
//   } catch (err) {
//     console.error(`send failed. ${err}`);
//     throw new functions.https.HttpsError("internal", "send failed.");
//   }
// });

// TODO.17-1
// exports.storeMail = functions.firestore.document("mailForm/{Id}").onCreate(async (snap, context) => {
//   // メール情報の作成
//   const auth = createAuth(credentialsJson, tokenJson);
//   const gmail = google.gmail({ version: "v1", auth });
//   const email = createEmail(snap.data());

//   // メール送付
//   try {
//     gmail.users.messages.send({
//       userId: "me",
//       resource: {
//         raw: email,
//       },
//     });
//   } catch (err) {
//     console.error(`send failed. ${err}`);
//   }
// });
