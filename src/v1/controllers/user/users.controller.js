const httpStatus = require("http-status");
const _ = require("lodash");
const { User, clientSchema } = require("../../models/user/user.model");
const {
  usersService,
  emailService,
  excelService,
  notificationsService,
} = require("../../services");
const success = require("../../config/success");

module.exports.authenticateUser = async (req, res, next) => {
  try {
    const user = req.user;
    const { lang, deviceToken } = req.query;

    // [OPTIONAL]: Update user's favorite language
    user.updateLanguage(lang);

    // [OPTIONAL]: Update user's device token
    user.updateDeviceToken(deviceToken);

    // Update user's last login date
    user.updateLastLogin();

    // Save user to the DB
    await user.save();

    // Create the response object
    const response = _.pick(user, clientSchema);

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.resendEmailOrPhoneVerificationCode =
  (key) => async (req, res, next) => {
    try {
      const user = req.user;
      const { lang } = req.query;

      // Asking service to send user's email/phone verification code
      const newUser = await usersService.resendEmailOrPhoneVerificationCode(
        key,
        user,
        lang
      );

      // Sending email or phone verification code to user's email or phone
      if (key === "email") {
        // Construct verification email
        const host = req.get("host");
        const protocol =
          host.split(":")[0] === "localhost" ? "http://" : "https://";
        const endpoint = "/api/users/email/verify/fast";
        const code = newUser.getCode("email");
        const token = newUser.genAuthToken();
        const verificationLink = `${protocol}${host}${endpoint}?code=${code}&token=${token}`;

        await emailService.sendVerificationCodeEmail(
          newUser.getLanguage(),
          newUser.getEmail(),
          code,
          newUser.getName(),
          verificationLink
        );
      } else {
        // TODO: send phone verification code to user's phone
      }

      // Create the response object
      const response = {
        ok: true,
        message:
          key === "email"
            ? success.auth.emailVerificationCodeSent
            : phoneVerificationCodeSent,
      };

      // Send response back to the client
      res.status(httpStatus.OK).json(response);
    } catch (err) {
      next(err);
    }
  };

module.exports.verifyEmailOrPhone = (key) => async (req, res, next) => {
  try {
    const user = req.user;
    const { code } = req.body;

    // Asking service to verify user's email or phone
    const verifiedUser = await usersService.verifyEmailOrPhone(key, user, code);

    // Notify user that proccess is accomplished successfully
    // and send a message to user's email or phone
    if (key === "email") {
      await emailService.sendEmailVerifiedEmail(
        user.getLanguage(),
        user.getEmail(),
        user.getName()
      );
    } else {
      // TODO: send an SMS message to user's phone
    }

    // Create the response object
    const response = _.pick(verifiedUser, clientSchema);

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.checkCode = (key) => async (req, res, next) => {
  try {
    const user = req.user;
    const { code } = req.body;

    // Asking service to check for user's
    // verification code status
    const {
      isCorrect,
      isValid,
      remainingDays,
      remainingHours,
      remainingMinutes,
      remainingSeconds,
    } = usersService.checkCode(key, user, code);

    // Create the response object
    const response = {
      key,
      isValid,
      isCorrect,
      remainingDays,
      remainingHours,
      remainingMinutes,
      remainingSeconds,
    };

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.checkIfEmailUsed = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if the given email used
    const isUsed = await usersService.checkIfEmailUsed(email);

    // Create the response object
    const response = {
      email,
      isUsed,
    };

    // Send the response back to client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.checkIfPhoneUsed = async (req, res, next) => {
  try {
    const { phoneICC, phoneNSN } = req.body;

    // Construct the full phone
    const fullPhone = `${phoneICC}${phoneNSN}`;

    // Check if the given email used
    const isUsed = await usersService.checkIfPhoneUsed(fullPhone);

    // Create the response object
    const response = {
      phone: fullPhone,
      isUsed,
    };

    // Send the response back to client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.verifyEmailByLink = async (req, res, next) => {
  try {
    const { token, code } = req.query;

    const user = await usersService.verifyEmailByLink(token, code);

    // Send email to user
    await emailService.sendEmailVerifiedEmail(
      user.getLanguage(),
      user.getEmail(),
      user.getName()
    );

    // Create the response object
    const response = success.auth.emailVerified[user.getLanguage()];

    // Send response back to the client
    res.status(httpStatus.OK).send(response);
  } catch (err) {
    next(err);
  }
};

module.exports.sendForgotPasswordCode = async (req, res, next) => {
  try {
    let { emailOrPhone, sendTo } = req.query;

    // Filter the `emailOrPhone` query paramerer
    //
    // HINT:
    // This filter exists because when sending a phone number
    // the `+` character gets replaced into an empty character.
    if (!emailOrPhone.includes("@")) {
      emailOrPhone = `+${emailOrPhone.trim()}`;
    }

    // Asking service to update user's password reset code
    const user = await usersService.sendForgotPasswordCode(emailOrPhone);

    // Send password reset code to phone or email
    if (sendTo === "phone") {
      // TODO: send forgot password code to user's phone.
    } else {
      await emailService.sendForgotPasswordEmail(
        user.getLanguage(),
        user.getEmail(),
        user.getCode("password"),
        user.getName()
      );
    }

    // Create the response object
    const response = {
      ok: true,
      message:
        sendTo === "phone"
          ? success.auth.passwordResetCodeSentToPhone
          : success.auth.passwordResetCodeSentToEmail,
    };

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.handleForgotPassword = async (req, res, next) => {
  try {
    const { emailOrPhone, code, newPassword } = req.body;

    // Asking service to reset user's password using the forgot
    // password code that the user has received it
    const user = await usersService.resetPasswordWithCode(
      emailOrPhone,
      code,
      newPassword
    );

    // Send email to user
    await emailService.sendPasswordChangedEmail(
      user.getLanguage(),
      user.getEmail(),
      user.getName()
    );

    // Create the response object
    const response = _.pick(user, clientSchema);

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.changePassword = async (req, res, next) => {
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;

    // Asking service to change user's password
    await usersService.changePassword(user, oldPassword, newPassword);

    // Send email to user
    await emailService.sendPasswordChangedEmail(
      user.getLanguage(),
      user.getEmail(),
      user.getName()
    );

    // Create the response object
    const response = {
      user: _.pick(user, clientSchema),
      token: user.genAuthToken(),
    };

    // Send response back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const { name, email, phoneICC, phoneNSN } = req.body;
    const avatar = req?.files?.avatar;

    // Asking service to update user's profile data
    const info = await usersService.updateProfile(
      user,
      name,
      email,
      phoneICC,
      phoneNSN,
      avatar
    );

    // Create the response object
    const response = {
      user: _.pick(info.newUser, clientSchema),
      changes: info.changes,
      token: info.newUser.genAuthToken(),
    };

    // Send response back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserAvatar = async (req, res, next) => {
  try {
    const user = req.user;

    // Asking service to remove user's avatar picture
    const newUser = await usersService.deleteUserAvatar(user);

    // Create the response object
    const response = _.pick(newUser, clientSchema);

    // Send response back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.switchLanguage = async (req, res, next) => {
  try {
    const user = req.user;

    const updatedUser = await usersService.switchLanguage(user);

    const response = _.pick(updatedUser, clientSchema);

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.seeNotifications = async (req, res, next) => {
  try {
    const user = req.user;

    // Asking service to mark all user's notifications as seen
    const notifications = await usersService.seeNotifications(user);

    // Create the response object
    const response = {
      notifications,
    };

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.clearNotifications = async (req, res, next) => {
  try {
    const user = req.user;

    // Asking service to delete all user's notifications
    const notifications = await usersService.clearNotifications(user);

    // Create the response object
    const response = {
      notifications,
    };

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.requestAccountDeletion = async (req, res, next) => {
  try {
    const user = req.user;

    // Asking service to delete all user's notifications
    const newUser = await usersService.requestAccountDeletion(user);

    // Construct deletion link
    const host = req.get("host");
    const protocol =
      host.split(":")[0] === "localhost" ? "http://" : "https://";
    const endpoint = "/api/users/account/deletion/confirm";
    const code = newUser.getCode("deletion");
    const token = newUser.genAuthToken();
    const deletionLink = `${protocol}${host}${endpoint}?code=${code}&token=${token}`;

    // Send email to user
    await emailService.sendAccountDeletionCodeEmail(
      newUser.getLanguage(),
      newUser.getEmail(),
      newUser.getName(),
      deletionLink
    );

    // Create the response object
    const response = success.auth.accountDeletionCodeSent;

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.confirmAccountDeletion = async (req, res, next) => {
  try {
    const { token, code } = req.query;

    // Delete user and their data
    const user = await usersService.confirmAccountDeletion(token, code);

    // Send an email to the user
    await emailService.sendAccountDeletedEmail(
      user.getLanguage(),
      user.getEmail(),
      user.getName()
    );

    // Create the response object
    const response = success.auth.accountDeleted[user.getLanguage()];

    // Send response back to the client
    res.status(httpStatus.OK).send(response);
  } catch (err) {
    next(err);
  }
};

///////////////////////////// ADMIN /////////////////////////////
module.exports.updateUserProfile = async (req, res, next) => {
  try {
    const { emailOrPhone, name, email, phoneICC, phoneNSN } = req.body;
    const avatar = req?.files?.avatar || null;

    const info = await usersService.updateUserProfile(
      emailOrPhone,
      name,
      email,
      phoneICC,
      phoneNSN,
      avatar
    );

    // Create the response object
    const response = {
      user: _.pick(info.newUser, clientSchema),
      changes: info.changes,
      token: info.newUser.genAuthToken(),
    };

    // Send response back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.changeUserRole = async (req, res, next) => {
  try {
    const { emailOrPhone, role } = req.body;

    // Asking service to update user's role
    const updatedUser = await usersService.changeUserRole(emailOrPhone, role);

    // Create the response object
    const response = _.pick(updatedUser, clientSchema);

    // Send response back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.verifyUser = async (req, res, next) => {
  try {
    const { emailOrPhone } = req.body;

    // Asking service to verify user's email and phone
    const updatedUser = await usersService.verifyUser(emailOrPhone);

    // Create the response object
    const response = _.pick(updatedUser, clientSchema);

    // Send response back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.findUserByEmailOrPhone = async (req, res, next) => {
  try {
    const { role, emailOrPhone } = req.query;

    // Asking service to find a user by its email or phone
    // with a specific role
    const user = await usersService.findUserByEmailOrPhone(
      emailOrPhone,
      role,
      true
    );

    // Create the response object
    const response = _.pick(user, clientSchema);

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.exportUsersToExcel = async (req, res, next) => {
  try {
    const users = await User.find({}).sort({ _id: -1 });

    // Get the path to the excel file
    const filePath = await excelService.exportUsersToExcelFile(users);

    // Create the response object
    const response = {
      type: "file/xlsx",
      path: filePath,
    };

    // Send response back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.sendNotification = async (req, res, next) => {
  try {
    const { userIds, titleEN, titleAR, bodyEN, bodyAR } = req.body;

    const notification = notificationsService.createNotification(
      titleEN,
      titleAR,
      bodyEN,
      bodyAR
    );

    await usersService.sendNotification(userIds, notification);

    res.status(httpStatus.OK).json(notification);
  } catch (err) {
    next(err);
  }
};

module.exports.getMostUsedUsers = async (req, res, next) => {
  try {
    const admin = req.user;
    const { page, limit } = req.query;

    // Get most used users in the specified page
    const { currentPage, totalPages, users } =
      await usersService.getMostUsedUsers(admin, page, limit);

    // Create the response object
    const response = {
      currentPage,
      totalPages,
      users: users.map((user) => _.pick(user, clientSchema)),
    };

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};
