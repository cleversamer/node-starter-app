const commonMiddleware = require("../common");

module.exports.authenticateUserValidator = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.conditionalCheck("lang", commonMiddleware.checkLanguage),
  commonMiddleware.conditionalCheck(
    "deviceToken",
    commonMiddleware.checkDeviceToken
  ),
  commonMiddleware.next,
];

module.exports.verifyEmailByLinkValidator = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkCode,
  commonMiddleware.next,
];

module.exports.forgotPasswordValidator = [
  commonMiddleware.checkEmailOrPhone,
  commonMiddleware.checkNewPassword,
  commonMiddleware.checkCode,
  commonMiddleware.next,
];

module.exports.getForgotPasswordCode = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkEmailOrPhone,
  commonMiddleware.checkSendTo,
  commonMiddleware.next,
];

module.exports.validateUpdateProfile = [
  commonMiddleware.conditionalCheck("name", commonMiddleware.checkName),
  commonMiddleware.checkFile("avatar", ["png", "jpg", "jpeg"], false),
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

module.exports.sendNotificationValidator = [
  commonMiddleware.checkUserIds,
  commonMiddleware.checkNotificationTitleEN,
  commonMiddleware.checkNotificationTitleAR,
  commonMiddleware.checkNotificationBodyEN,
  commonMiddleware.checkNotificationBodyAR,
  commonMiddleware.next,
];

module.exports.changePasswordValidator = [
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

module.exports.codeValidator = [
  commonMiddleware.checkCode,
  commonMiddleware.next,
];

module.exports.validateGetMostUsedUsers = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkPage,
  commonMiddleware.checkLimit,
  commonMiddleware.next,
];
