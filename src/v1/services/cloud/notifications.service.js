const admin = require("firebase-admin");
const FCM = require("fcm-notification");
const serviceAccount = require("../../config/system/service-account.json");
const errors = require("../../config/errors");
const httpStatus = require("http-status");
const { ApiError } = require("../../middleware/apiError");

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

const filterTokens = (tokens = []) =>
  tokens.filter((token) => token && token !== "token");
