const commonMiddleware = require("../common");

module.exports.registerWithEmailValidator = [
  commonMiddleware.conditionalCheck("lang", commonMiddleware.checkLanguage),
  commonMiddleware.checkName,
  commonMiddleware.checkEmail,
  commonMiddleware.checkPhoneICC,
  commonMiddleware.checkPhoneNSN,
  commonMiddleware.checkPassword,
  commonMiddleware.conditionalCheck(
    "deviceToken",
    commonMiddleware.checkDeviceToken
  ),
  commonMiddleware.next,
];

module.exports.registerWithGoogleValidator = [
  commonMiddleware.conditionalCheck("lang", commonMiddleware.checkLanguage),
  commonMiddleware.checkPhoneICC,
  commonMiddleware.checkPhoneNSN,
  commonMiddleware.conditionalCheck(
    "deviceToken",
    commonMiddleware.checkDeviceToken
  ),
  commonMiddleware.next,
];

module.exports.loginWithEmailValidator = [
  commonMiddleware.conditionalCheck("lang", commonMiddleware.checkLanguage),
  commonMiddleware.checkEmailOrPhone,
  commonMiddleware.checkPassword,
  commonMiddleware.conditionalCheck(
    "deviceToken",
    commonMiddleware.checkDeviceToken
  ),
  commonMiddleware.next,
];

module.exports.loginWithGoogleValidator = [
  commonMiddleware.conditionalCheck("lang", commonMiddleware.checkLanguage),
  commonMiddleware.conditionalCheck(
    "deviceToken",
    commonMiddleware.checkDeviceToken
  ),
  commonMiddleware.next,
];
