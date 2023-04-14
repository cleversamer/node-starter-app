const { User } = require("../../models/user/user.model");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const emailService = require("../cloud/email.service");
const notificationsService = require("../cloud/notifications.service");
const serverErrorsService = require("../system/serverErrors.service");
const localStorage = require("../storage/localStorage.service");
const cloudStorage = require("../cloud/cloudStorage.service");
const { ApiError } = require("../../middleware/apiError");
const errors = require("../../config/errors");
const userAgentParser = require("ua-parser-js");
const {
  user: userNotifications,
  admin: adminNotifications,
} = require("../../config/notifications");
const requestIp = require("request-ip");

module.exports.notifyUsersWithUnseenNotifications = async () => {
  try {
    // Find users with unseen notifications
    const users = await User.find({
      notifications: { $elemMatch: { seen: false } },
    });

    // Check if there are users with unseen notifications
    if (!users || !users.length) {
      return;
    }

    const notification = userNotifications.hasUnreadNotifications();

    // Pick only users that they haven't received this notification
    const userIds = users
      .filter((user) => user.hasReceivedNotification(notification))
      .map((user) => user._id);

    // Check if there are users that they haven't received
    // this notification yet.
    if (!userIds || !userIds.length) {
      return;
    }

    await this.sendNotification(userIds, notification);
  } catch (err) {
    return;
  }
};

module.exports.notifyAdminsWithServerErrors = async () => {
  try {
    // Find users with unseen notifications
    const admins = await User.find({ role: "admin" });

    // Check if there are users with unseen notifications
    if (!admins || !admins.length) {
      return;
    }

    // Check if there are server errors occurred
    const serverErrorsCount = await serverErrorsService.getAllErrorsCount();
    if (!serverErrorsCount) {
      return;
    }

    // Construct the notification object
    const notification =
      adminNotifications.serverErrorsOccurred(serverErrorsCount);

    // Pick only users that they haven't received this notification
    const userIds = admins
      .filter((user) => user.hasReceivedNotification(notification))
      .map((user) => user._id);

    // Check if there are users that they haven't received
    // this notification yet.
    if (!userIds || !userIds.length) {
      return;
    }

    await this.sendNotification(userIds, notification);
  } catch (err) {
    return;
  }
};

module.exports.parseUserAgent = (request) => {
  try {
    const userAgent = userAgentParser(request.headers["user-agent"]);

    const { os, browser, cpu, device, engine, ua } = userAgent;
    const osName =
      os.name && os.version ? `${os.name} ${os.version}` : os.name || "";

    const ip = requestIp.getClientIp(request);

    return {
      osName,
      ip,
      browser,
      cpu,
      device,
      engine,
      ua,
    };
  } catch (err) {
    throw err;
  }
};

module.exports.findUserByEmailOrPhone = async (
  emailOrPhone,
  role = "",
  withError = false
) => {
  try {
    // Find user by email or phone
    const user = await User.findOne({
      $or: [
        { email: { $eq: emailOrPhone } },
        { "phone.full": { $eq: emailOrPhone } },
      ],
      deleted: false,
    });

    // Throwing error if no user found and `throwError = true`
    if (withError && !user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.notFound;
      throw new ApiError(statusCode, message);
    }

    // Throwing error if a user was found but the specified `role` does not match
    // This happens in case of role is added as an argument
    // If role is falsy that means this search does not care of role
    if (withError && user && role && user.getRole() !== role) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.foundWithInvalidRole;
      throw new ApiError(statusCode, message);
    }

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.findUserById = async (userId, withError = false) => {
  try {
    const user = await User.findOne({ _id: userId, deleted: false });

    if (withError && !user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.notFound;
      throw new ApiError(statusCode, message);
    }

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.findAdmins = async () => {
  try {
    return await User.find({
      role: "admin",
      "verified.email": true,
      deleted: false,
    });
  } catch (err) {
    throw err;
  }
};

module.exports.validateToken = (token) => {
  try {
    return jwt.verify(token, process.env["JWT_PRIVATE_KEY"]);
  } catch (err) {
    throw err;
  }
};

module.exports.verifyEmailOrPhone = async (key, user, code) => {
  try {
    // Ensure that key is correct
    key = key.toLowerCase();
    if (!["email", "phone"].includes(key)) {
      key = "email";
    }

    // Check if user's email or phone is verified
    const isVerified =
      key === "email" ? user.isEmailVerified() : user.isPhoneVerified();
    if (isVerified) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user[`${key}AlreadyVerified`];
      throw new ApiError(statusCode, message);
    }

    // Check if code is correct
    const isCorrectCode = user.isMatchingCode(key, code);
    if (!isCorrectCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.incorrectCode;
      throw new ApiError(statusCode, message);
    }

    // Check if code is expired
    const isValidCode = user.isValidCode(key);
    if (!isValidCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.expiredCode;
      throw new ApiError(statusCode, message);
    }

    // Verify user's email or phone
    if (key === "email") {
      user.verifyEmail();
    } else {
      user.verifyPhone();
    }

    // Save user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.checkCode = (key, user, code) => {
  try {
    // Check if code is valid
    const isValid = user.isValidCode(key);

    // Check if code is correct
    const isCorrect = user.isMatchingCode(key, code);

    // Calculate remaining time
    const { days, hours, minutes, seconds } = user.getCodeRemainingTime(key);

    return {
      isValid,
      isCorrect,
      remainingDays: days,
      remainingHours: hours,
      remainingMinutes: minutes,
      remainingSeconds: seconds,
    };
  } catch (err) {
    throw err;
  }
};

module.exports.resendEmailOrPhoneVerificationCode = async (key, user) => {
  try {
    // Ensure that key is correct
    key = key.toLowerCase();
    if (!["email", "phone"].includes(key)) {
      key = "email";
    }

    // Check if user's email or phone is verified
    const isVerified =
      key === "email" ? user.isEmailVerified() : user.isPhoneVerified();
    if (isVerified) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user[`${key}AlreadyVerified`];
      throw new ApiError(statusCode, message);
    }

    // Update user's email or phone verification code
    // Send code in a message to user's email or phone
    user.updateCode(key);

    // Save user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.verifyEmailByLink = async (token, code) => {
  try {
    const payload = this.validateToken(token);

    // Check if user exists
    const user = await User.findById(payload.sub);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.notFound;
      throw new ApiError(statusCode, message);
    }

    // Check if user's email is already verified
    if (user.isEmailVerified()) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user.emailAlreadyVerified;
      throw new ApiError(statusCode, message);
    }

    // Check if code is correct
    const isCorrectCode = user.isMatchingCode("email", code);
    if (!isCorrectCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.incorrectCode;
      throw new ApiError(statusCode, message);
    }

    // Check if code is expired
    const isValidCode = user.isValidCode("email");
    if (!isValidCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.expiredCode;
      throw new ApiError(statusCode, message);
    }

    // Verify user's email
    user.verifyEmail();

    // Save user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.changePassword = async (user, oldPassword, newPassword) => {
  try {
    // Decoding user's password and comparing it with the old password
    if (!(await user.comparePassword(oldPassword))) {
      const statusCode = httpStatus.UNAUTHORIZED;
      const message = errors.auth.incorrectOldPassword;
      throw new ApiError(statusCode, message);
    }

    // Decoding user's password and comparing it with the new password
    if (await user.comparePassword(newPassword)) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.oldPasswordMatchNew;
      throw new ApiError(statusCode, message);
    }

    // Update password
    await user.updatePassword(newPassword);

    // Save user
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.sendForgotPasswordCode = async (emailOrPhone) => {
  try {
    // Check if user exists
    const user = await this.findUserByEmailOrPhone(emailOrPhone);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.auth.emailOrPhoneNotUsed;
      throw new ApiError(statusCode, message);
    }

    // Update password reset code
    user.updateCode("password");

    // Save user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.resetPasswordWithCode = async (
  emailOrPhone,
  code,
  newPassword
) => {
  try {
    // Check if user exists
    const user = await this.findUserByEmailOrPhone(emailOrPhone);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.auth.emailOrPhoneNotUsed;
      throw new ApiError(statusCode, message);
    }

    // Check if code is correct
    const isCorrectCode = user.isMatchingCode("password", code);
    if (!isCorrectCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.incorrectCode;
      throw new ApiError(statusCode, message);
    }

    // Check if code is expired
    const isValidCode = user.isValidCode("password");
    if (!isValidCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.expiredCode;
      throw new ApiError(statusCode, message);
    }

    // Update password
    await user.updatePassword(newPassword);

    // Save user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.updateProfile = async (
  user,
  name,
  email,
  phoneICC,
  phoneNSN,
  avatar
) => {
  try {
    const body = {
      user,
      name,
      email,
      phoneICC,
      phoneNSN,
      avatar,
    };

    return await updateUserProfile(user, body);
  } catch (err) {
    throw err;
  }
};

module.exports.deleteUserAvatar = async (user) => {
  try {
    // Check if doesn's have an avatar URL
    if (!user.getAvatarURL()) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user.noAvatar;
      throw new ApiError(statusCode, message);
    }

    // Check if user's avatar URL does not point
    // to this server or any of app's storage buckets
    if (!user.hasGoogleAvatar()) {
      await cloudStorage.deleteFile(user.getAvatarURL());
    }

    // Set user's avatar to an empty string
    user.clearAvatarURL();

    // Save user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.switchLanguage = async (user) => {
  try {
    // Switch user's language
    user.switchLanguage();

    // Save user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.sendNotification = async (userIds, notification, callback) => {
  try {
    // Validate callback function
    callback = typeof callback === "function" ? callback : () => {};

    // Decide query criteria based on array of users
    const queryCriteria = userIds.length
      ? { _id: { $in: userIds } }
      : { role: { $not: { $in: ["admin"] } } };

    // Check if there are users
    const users = await User.find(queryCriteria);
    if (!users || !users.length) {
      return;
    }

    // Get users' tokens and add notification to them
    const tokens = users.map((user) => {
      try {
        // Add notification to user
        user.addNotification(notification);

        // Save user to the BB
        user.save();

        return { lang: user.getLanguage(), value: user.getDeviceToken() };
      } catch (err) {
        return "";
      }
    });

    // Get device tokens for english users
    const enTokens = tokens
      .filter((token) => token.lang === "en")
      .map((token) => token.value);

    // Get device tokens for arabic users
    const arTokens = tokens
      .filter((token) => token.lang === "ar")
      .map((token) => token.value);

    // Send notification to english users
    notificationsService.sendPushNotification(
      notification.title.en,
      notification.body.en,
      enTokens,
      callback,
      notification.photoURL
    );

    // Send notification to arabic users
    notificationsService.sendPushNotification(
      notification.title.ar,
      notification.body.ar,
      arTokens,
      callback,
      notification.photoURL
    );

    return true;
  } catch (err) {
    throw err;
  }
};

module.exports.sendNotificationToAdmins = async (notification, callback) => {
  try {
    // Validate callback function
    callback = typeof callback === "function" ? callback : () => {};

    // Check if there are admins
    const admins = await this.findAdminsAndSecretaries();
    if (!admins.length) {
      return;
    }

    // Get admins' tokens and add notification to them
    const tokens = admins.map((admin) => {
      try {
        // Add the notification to user's notifications array
        // Save the user to the database
        admin.addNotification(notification);
        admin.save();

        return {
          lang: userNotifications.favLang,
          value: userNotifications.deviceToken,
        };
      } catch (err) {
        return "";
      }
    });

    // Get device tokens for english users
    const enTokens = tokens
      .filter((token) => token.lang === "en")
      .map((token) => token.value);

    // Get device tokens for arabic users
    const arTokens = tokens
      .filter((token) => token.lang === "ar")
      .map((token) => token.value);

    // Send notification to english users
    notificationsService.sendPushNotification(
      notification.title.en,
      notification.body.en,
      enTokens,
      callback,
      notification.photoURL
    );

    // Send notification to arabic users
    notificationsService.sendPushNotification(
      notification.title.ar,
      notification.body.ar,
      arTokens,
      callback,
      notification.photoURL
    );

    return true;
  } catch (err) {
    throw err;
  }
};

module.exports.seeNotifications = async (user) => {
  try {
    // Check all user's notifications
    const { isAllSeen, list } = user.seeNotifications();

    // Throw an error in case of all user's notifications
    // are already seen
    if (isAllSeen) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user.notificationsSeen;
      throw new ApiError(statusCode, message);
    }

    // Save the user
    await user.save();

    // Return user's notifications
    return list;
  } catch (err) {
    throw err;
  }
};

module.exports.clearNotifications = async (user) => {
  try {
    // Clear notifications
    const isEmpty = user.clearNotifications();

    // Check if notifications are empty
    if (isEmpty) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user.noNotifications;
      throw new ApiError(statusCode, message);
    }

    // Save the user
    await user.save();

    // Return user's notifications
    return user.notifications;
  } catch (err) {
    throw err;
  }
};

module.exports.requestAccountDeletion = async (user) => {
  try {
    // Update user's account deletion code
    user.updateCode("deletion");

    // Save the user
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.confirmAccountDeletion = async (token, code) => {
  try {
    const payload = this.validateToken(token);

    // Check if user exists
    const user = await User.findById(payload.sub);
    if (!user || user.isDeleted()) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.notFound;
      throw new ApiError(statusCode, message);
    }

    // Check if code is correct
    const isCorrectCode = user.isMatchingCode("deletion", code);
    if (!isCorrectCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.incorrectCode;
      throw new ApiError(statusCode, message);
    }

    // Check if code is expired
    const isValidCode = user.isValidCode("deletion");
    if (!isValidCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.expiredCode;
      throw new ApiError(statusCode, message);
    }

    // Mark user as deleted
    user.markAsDeleted();

    // Save user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

///////////////////////////// ADMIN /////////////////////////////
module.exports.changeUserRole = async (emailOrPhone, role) => {
  try {
    // Check if user exists
    const user = await this.findUserByEmailOrPhone(emailOrPhone);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.notFound;
      throw new ApiError(statusCode, message);
    }

    if (user.isAdmin()) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.updateAdminRole;
      throw new ApiError(statusCode, message);
    }

    // Update user's role
    user.updateRole(role);

    // Save user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.verifyUser = async (emailOrPhone) => {
  try {
    // Check if used exists
    const user = await this.findUserByEmailOrPhone(emailOrPhone);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.notFound;
      throw new ApiError(statusCode, message);
    }

    // Check if user's email and phone are already verified
    if (user.isEmailVerified() && user.isPhoneEqual()) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user.alreadyVerified;
      throw new ApiError(statusCode, message);
    }

    // Verify user's email
    user.verifyEmail();

    // Verify user's phone
    user.verifyPhone();

    // Save user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.updateUserProfile = async (
  emailOrPhone,
  name,
  email,
  phoneICC,
  phoneNSN,
  avatar
) => {
  try {
    // Checking if user exists
    const user = await this.findUserByEmailOrPhone(emailOrPhone);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.notFound;
      throw new ApiError(statusCode, message);
    }

    const body = {
      emailOrPhone,
      name,
      email,
      phoneICC,
      phoneNSN,
      avatar,
    };

    return await updateUserProfile(user, body);
  } catch (err) {
    throw err;
  }
};

module.exports.getMostUsedUsers = async (admin, page, limit) => {
  try {
    page = parseInt(page);
    limit = parseInt(limit);

    // Decide query criteria
    const queryCriteria = { _id: { $not: { $eq: admin._id } } };

    // Find users in the given page
    const users = await User.find(queryCriteria)
      .sort({ noOfRequests: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // Check if users exist
    if (!users || !users.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.noUsers;
      throw new ApiError(statusCode, message);
    }

    // Get the count of all users
    const count = await User.count(queryCriteria);

    return {
      users,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    };
  } catch (err) {
    throw err;
  }
};

const updateUserProfile = async (user, body) => {
  try {
    const { name, email, phoneICC, phoneNSN, avatar } = body;

    // To store data changes
    const changes = [];

    // Updating name when there's new name
    if (name && !user.compareName(name)) {
      // Update user's name
      user.updateName(name);

      // Add name to changes list
      changes.push("name");
    }

    // Updating avatar when there's new avatar
    if (avatar) {
      // Store file locally in the `uploads` folder
      const localPhoto = await localStorage.storeFile(avatar);

      // Upload file from `uploads` folder to cloud bucket
      const cloudPhotoURL = await cloudStorage.uploadFile(localPhoto);

      // Delete previous avatar picture from cloud bucket
      await cloudStorage.deleteFile(user.getAvatarURL());

      // Update user's avatar URL
      user.updateAvatarURL(cloudPhotoURL);

      // Add user's avatar to changes
      changes.push("avatarURL");
    }

    // Update email if it's new
    if (email && user.getEmail() !== email) {
      // Checking if email used
      const emailUsed = await this.findUserByEmailOrPhone(email);
      if (emailUsed) {
        const statusCode = httpStatus.NOT_FOUND;
        const message = errors.auth.emailUsed;
        throw new ApiError(statusCode, message);
      }

      // Update user's email
      user.updateEmail(email);

      // Mark user's email as not verified
      user.unverifyEmail();

      // Update user's email verification code
      user.updateCode("email");

      // Add user's email to changes
      changes.push("email");

      // Send email to user
      await emailService.sendChangeEmail(
        user.getLanguage(),
        user.getEmail(),
        user.getCode("email"),
        user.getName()
      );
    }

    // Update phone if it's new
    const isPhoneEqual = user.getPhone() === `${phoneICC}${phoneNSN}`;
    if ((phoneICC || phoneNSN) && !isPhoneEqual) {
      // Decide new phone number
      const newICC = `${phoneICC || user.getPhoneICC()}`;
      const newNSN = `${phoneNSN || user.getPhoneNSN()}`;
      const fullPhone = `${newICC}${newNSN}`;

      // Checking if new phone number is used
      const phoneUsed = await this.findUserByEmailOrPhone(fullPhone);
      if (phoneUsed) {
        const statusCode = httpStatus.FORBIDDEN;
        const message = errors.auth.phoneUsed;
        throw new ApiError(statusCode, message);
      }

      // Update user's phone
      user.updatePhone(newICC, newNSN);

      // Mark user's phone as not verified
      user.unverifyPhone();

      // Update user's phone verification code
      user.updateCode("phone");

      // Add user's phone to changes
      changes.push("phone");

      // TODO: send phone verification code to user's phone
    }

    // Check if there were no updates
    if (!changes.length) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user.notUpdated;
      throw new ApiError(statusCode, message);
    }

    // Save user to the DB
    await user.save();

    return { newUser: user, changes };
  } catch (err) {
    throw err;
  }
};
