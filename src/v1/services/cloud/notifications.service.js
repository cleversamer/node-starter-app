const admin = require("firebase-admin");
const FCM = require("fcm-notification");
const serviceAccount = require("../../config/system/service-account.json");
const { Notification } = require("../../config/notifications");
const certPath = admin.credential.cert(serviceAccount);
const fcm = new FCM(certPath);

module.exports.sendPushNotification = (
  title,
  body,
  tokens,
  callback,
  photoURL
) => {
  try {
    tokens = filterTokens(tokens);

    let payload = {
      data: {},
      notification: {
        title,
        body,
        icon: photoURL,
      },
    };

    fcm.sendToMultipleToken(payload, tokens, callback);
  } catch (err) {
    throw err;
  }
};

module.exports.createNotification = (titleEN, titleAR, bodyEN, bodyAR) => {
  try {
    return new Notification(titleEN, titleAR, bodyEN, bodyAR);
  } catch (err) {
    throw err;
  }
};

const filterTokens = (tokens = []) =>
  tokens.filter((token) => token && token !== "token");
