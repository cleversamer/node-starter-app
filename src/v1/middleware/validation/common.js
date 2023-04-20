const { check, validationResult } = require("express-validator");
const langdetect = require("langdetect");
const httpStatus = require("http-status");
const { ApiError } = require("../apiError");
const errors = require("../../config/errors");
const { server } = require("../../config/system");
const countries = require("../../data/countries.json");
const {
  user: userValidation,
  review: reviewValidation,
} = require("../../config/models");
const { isValidObjectId } = require("mongoose");

module.exports.putQueryParamsInBody = (req, res, next) => {
  req.body = {
    ...req.query,
    ...req.params,
    ...req.body,
  };

  next();
};

module.exports.parseTokenFromQuery = (req, res, next) => {
  req.headers["Authorization"] = "Bearer " + req.query["token"];
  next();
};

module.exports.next = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.array()[0].msg;
    const err = new ApiError(statusCode, message);
    return next(err);
  }

  next();
};

module.exports.checkDeviceToken = check("deviceToken")
  .trim()
  .isLength({
    min: userValidation.deviceToken.minLength,
    max: userValidation.deviceToken.maxLength,
  })
  .withMessage(errors.auth.invalidDeviceToken);

module.exports.checkEmailOrPhone = check("emailOrPhone")
  .trim()
  .isLength({
    min: Math.min(userValidation.email.minLength, countries.minPhone),
    max: Math.max(userValidation.email.maxLength, countries.maxPhone),
  })
  .withMessage(errors.auth.invalidEmailOrPhone)
  .bail();

module.exports.checkEmail = check("email")
  .trim()
  .isEmail()
  .withMessage(errors.auth.invalidEmail)
  .bail()
  .isLength({
    min: userValidation.email.minLength,
    max: userValidation.email.maxLength,
  })
  .bail()
  .withMessage(errors.auth.invalidEmail);

module.exports.checkAuthType = check("authType")
  .trim()
  .isIn(userValidation.authTypes)
  .withMessage(errors.user.invalidAuthType);

module.exports.checkPassword = check("password")
  .trim()
  .isLength({
    min: userValidation.password.minLength,
    max: userValidation.password.maxLength,
  })
  .withMessage(errors.auth.invalidPassword);

module.exports.checkOldPassword = check("oldPassword")
  .trim()
  .isLength({
    min: userValidation.password.minLength,
    max: userValidation.password.maxLength,
  })
  .withMessage(errors.auth.invalidPassword);

module.exports.checkNewPassword = check("newPassword")
  .trim()
  .isLength({
    min: userValidation.password.minLength,
    max: userValidation.password.maxLength,
  })
  .withMessage(errors.auth.invalidPassword);

module.exports.checkCode = check("code")
  .isLength({
    min: userValidation.verificationCode.exactLength,
    max: userValidation.verificationCode.exactLength,
  })
  .withMessage(errors.auth.invalidCode);

module.exports.checkLanguage = check("lang")
  .trim()
  .notEmpty()
  .withMessage(errors.user.noLanguage)
  .isIn(server.SUPPORTED_LANGUAGES)
  .withMessage(errors.user.unsupportedLanguage);

module.exports.checkName = check("name")
  .trim()
  .isLength({
    min: userValidation.name.minLength,
    max: userValidation.name.maxLength,
  })
  .withMessage(errors.auth.invalidName);

module.exports.checkRole = (exceptAdmin = false) =>
  exceptAdmin
    ? check("role")
        .trim()
        .isIn(userValidation.roles.filter((role) => role !== "admin"))
        .withMessage(errors.user.invalidRole)
    : check("role")
        .trim()
        .isIn(userValidation.roles)
        .withMessage(errors.user.invalidRole);

module.exports.checkRegisterRole = check("role")
  .trim()
  .isIn(userValidation.registerRoles)
  .withMessage(errors.user.invalidRole);

module.exports.checkPhoneICC = check("phoneICC")
  .isIn(countries.list.map((c) => c.icc))
  .withMessage(errors.auth.invalidICC);

module.exports.checkPhoneNSN = check("phoneNSN")
  .isNumeric()
  .withMessage(errors.auth.invalidPhone)
  .isLength({
    min: countries.minNSN,
    max: countries.maxNSN,
  })
  .withMessage(errors.auth.invalidPhone);

module.exports.conditionalCheck = (key, checker) => (req, res, next) =>
  req.body[key] ? checker(req, res, next) : next();

module.exports.checkFile =
  (key, supportedTypes, compulsory = true) =>
  (req, res, next) => {
    if (!compulsory && (!req.files || !req.files[key])) {
      return next();
    }

    if (compulsory && (!req.files || !req.files[key])) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.system.noPhoto;
      const err = new ApiError(statusCode, message);
      return next(err);
    }

    const fileType = req.files[key].name.split(".")[1];
    if (!supportedTypes.includes(fileType)) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.system.invalidExtension;
      const err = new ApiError(statusCode, message);
      return next(err);
    }

    next();
  };

module.exports.checkPage = (req, res, next) => {
  try {
    const { page } = req.body;

    // Check if page exist
    if (!page) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.system.pageNumberRequired;
      throw new ApiError(statusCode, message);
    }

    // Check if page is a numeric value
    const number = parseInt(page);
    const isNumber = Number.isInteger(number);
    if (!isNumber) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.system.pageNumberRequired;
      throw new ApiError(statusCode, message);
    }

    // Check if page number is positive
    if (number < 1) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.system.invalidPageNumber;
      throw new ApiError(statusCode, message);
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports.checkLimit = (req, res, next) => {
  try {
    const { limit } = req.body;

    // Check if limit exist
    if (!limit) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.system.limitNumberRequired;
      throw new ApiError(statusCode, message);
    }

    // Check if limit is a numeric value
    const number = parseInt(limit);
    const isNumber = Number.isInteger(number);
    if (!isNumber) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.system.limitNumberRequired;
      throw new ApiError(statusCode, message);
    }

    // Check if limit number is positive
    if (number < 1) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.system.invalidLimitNumber;
      throw new ApiError(statusCode, message);
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports.checkUserId = check("userId")
  .isMongoId()
  .withMessage(errors.user.invalidId);

module.exports.checkUserIds = (req, res, next) => {
  try {
    const { userIds } = req.body;

    // Check if `userIds` is valid
    if (!userIds || !Array.isArray(userIds)) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user.invalidUserIds;
      throw new ApiError(statusCode, message);
    }

    // Filter `userIds` and pick valid MongoDB Document ID
    const filteredArray = userIds.filter((userId) => isValidObjectId(userId));

    // Update `userIds` in the body
    req.body.userIds = filteredArray;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports.checkNotificationTitleEN = [
  check("titleEN")
    .isLength({
      min: userValidation.notificationTitle.min,
      max: userValidation.notificationTitle.max,
    })
    .withMessage(errors.user.invalidNotificationTitle),

  checkTextLanguage("titleEN", "en", errors.notification.invalidTitleEN),
];

module.exports.checkNotificationTitleAR = [
  check("titleAR")
    .isLength({
      min: userValidation.notificationTitle.min,
      max: userValidation.notificationTitle.max,
    })
    .withMessage(errors.user.invalidNotificationTitle),

  checkTextLanguage("titleAR", "ar", errors.notification.invalidTitleAR),
];

module.exports.checkNotificationBodyEN = [
  check("bodyEN")
    .isLength({
      min: userValidation.notificationBody.min,
      max: userValidation.notificationBody.max,
    })
    .withMessage(errors.user.invalidNotificationBody),

  checkTextLanguage("bodyEN", "en", errors.notification.invalidBodyEN),
];

module.exports.checkNotificationBodyAR = [
  check("bodyAR")
    .isLength({
      min: userValidation.notificationBody.min,
      max: userValidation.notificationBody.max,
    })
    .withMessage(errors.user.invalidNotificationBody),

  checkTextLanguage("bodyAR", "ar", errors.notification.invalidBodyAR),
];

module.exports.checkSendTo = check("sendTo")
  .isIn(userValidation.receiverTypes)
  .withMessage(errors.user.unsupportedReceiverType);

module.exports.checkReviewId = check("reviewId")
  .isMongoId()
  .withMessage(errors.review.invalidId);

module.exports.checkReviewContent = check("content")
  .isLength({
    min: reviewValidation.content.minLength,
    max: reviewValidation.content.maxLength,
  })
  .withMessage(errors.review.invalidContent);

module.exports.checkForRealName = (key) => (req, res, next) => {
  try {
    // Get the name
    const name = req.body[key];

    // Create the RegEx pattern for real names
    const namePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

    // Check if name is real
    const isRealName = namePattern.test(name);
    if (!isRealName) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.user.unrealName;
      throw new ApiError(statusCode, message);
    }

    next();
  } catch (err) {
    next(err);
  }
};

function checkTextLanguage(key, language, errorMssg) {
  return (req, res, next) => {
    try {
      // Get the text
      const text = req.body[key];

      // Get all detected language from text
      const detections = langdetect.detect(text);

      // Check if the required language is detected
      const isDetected = detections.map((d) => d.lang).includes(language);
      if (!isDetected) {
        const statusCode = httpStatus.BAD_REQUEST;
        const message = errorMssg || errors.system.invalidLanguage;
        throw new ApiError(statusCode, message);
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports.checkErrorId = check("errorId")
  .isMongoId()
  .withMessage(errors.serverError.invalidId);

module.exports.checkLinkKey = check("linkKey")
  .isIn(userValidation.supportedLinks)
  .withMessage(errors.user.invalidLinkKey);

module.exports.checkLinkValue = check("link")
  .isLength({
    min: userValidation.link.minLength,
    max: userValidation.link.maxLength,
  })
  .withMessage(errors.user.invalidLinkValue);
