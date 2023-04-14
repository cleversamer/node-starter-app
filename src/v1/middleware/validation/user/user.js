const commonMiddleware = require("../common");
const { server } = require("../../../config/system");

module.exports.validateAuthenticateUser = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.conditionalCheck("lang", commonMiddleware.checkLanguage),
  commonMiddleware.conditionalCheck(
    "deviceToken",
    commonMiddleware.checkDeviceToken
  ),
  commonMiddleware.next,
];

module.exports.validateVerifyEmailByLink = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkCode,
  commonMiddleware.next,
];

module.exports.validateHanfleForgotPassword = [
  commonMiddleware.checkEmailOrPhone,
  commonMiddleware.checkNewPassword,
  commonMiddleware.checkCode,
  commonMiddleware.next,
];

module.exports.validateSendForgotPasswordCode = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkEmailOrPhone,
  commonMiddleware.conditionalCheck("sendTo", commonMiddleware.checkSendTo),
  commonMiddleware.next,
];

module.exports.validateUpdateProfile = [
  commonMiddleware.conditionalCheck("name", commonMiddleware.checkName),
  commonMiddleware.conditionalCheck(
    "name",
    commonMiddleware.checkForRealName("name")
  ),
  commonMiddleware.checkFile(
    "avatar",
    server.SUPPORTED_PHOTO_EXTENSIONS,
    false
  ),
  commonMiddleware.conditionalCheck("email", commonMiddleware.checkEmail),
  commonMiddleware.conditionalCheck("phoneICC", commonMiddleware.checkPhoneICC),
  commonMiddleware.conditionalCheck("phoneNSN", commonMiddleware.checkPhoneNSN),
  commonMiddleware.next,
];

module.exports.validateConfirmAccountDeletion = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkCode,
  commonMiddleware.next,
];

module.exports.validateUpdateUserProfile = [
  commonMiddleware.checkEmailOrPhone,
  ...this.validateUpdateProfile,
];

module.exports.validateUpdateUserRole = [
  commonMiddleware.checkEmailOrPhone,
  commonMiddleware.checkRole(true),
  commonMiddleware.next,
];

module.exports.validateVerifyUser = [
  commonMiddleware.checkEmailOrPhone,
  commonMiddleware.next,
];

module.exports.validateFindUserByEmailOrPhone = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkEmailOrPhone,
  commonMiddleware.checkRole(true),
  commonMiddleware.next,
];

module.exports.validateSendNotification = [
  commonMiddleware.checkUserIds,
  commonMiddleware.checkNotificationTitleEN,
  commonMiddleware.checkNotificationTitleAR,
  commonMiddleware.checkNotificationBodyEN,
  commonMiddleware.checkNotificationBodyAR,
  commonMiddleware.next,
];

module.exports.validateChangePassword = [
  commonMiddleware.conditionalCheck(
    "oldPassword",
    commonMiddleware.checkOldPassword
  ),
  commonMiddleware.checkNewPassword,
  commonMiddleware.next,
];

module.exports.emailValidator = [
  commonMiddleware.checkEmail,
  commonMiddleware.next,
];

module.exports.validateCode = [
  commonMiddleware.checkCode,
  commonMiddleware.next,
];

module.exports.validateGetMostUsedUsers = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkPage,
  commonMiddleware.checkLimit,
  commonMiddleware.next,
];
