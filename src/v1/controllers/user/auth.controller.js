const {
  authService,
  emailService,
  usersService,
  loginActivitiesService,
} = require("../../services");
const { user: userNotifications } = require("../../config/notifications");
const httpStatus = require("http-status");
const { clientSchema } = require("../../models/user/user.model");
const _ = require("lodash");

module.exports.registerWithEmail = async (req, res, next) => {
  try {
    const { lang, name, email, phoneICC, phoneNSN, password, deviceToken } =
      req.body;

    // Create the user
    const user = await authService.registerWithEmail(
      email,
      password,
      name,
      phoneICC,
      phoneNSN,
      deviceToken,
      lang
    );

    // Send welcoming email
    await emailService.sendWelcomingEmail(user.favLang, user.email, user.name);

    // Construct verification email
    const host = req.get("host");
    const protocol =
      host.split(":")[0] === "localhost" ? "http://" : "https://";
    const endpoint = "/api/users/email/verify/fast";
    const { code } = user.verification.email;
    const token = user.genAuthToken();
    const verificationLink = `${protocol}${host}${endpoint}?code=${code}&token=${token}`;

    // Send register email with email verification code
    // if user is joining for the first time
    await emailService.sendVerificationCodeEmail(
      user.favLang,
      user.email,
      user.verification.email.code,
      user.name,
      verificationLink
    );

    // TODO: send phone activation code to user's phone.

    // Create response object
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

module.exports.registerWithGoogle = async (req, res, next) => {
  try {
    const { lang, googleToken, phoneICC, phoneNSN, deviceToken } = req.body;

    // Create the user
    const { user, isAlreadyRegistered } = await authService.registerWithGoogle(
      googleToken,
      phoneICC,
      phoneNSN,
      deviceToken,
      lang
    );

    // Check if user is alredy registered
    // If yes, then send login activity email to user
    if (isAlreadyRegistered) {
      // Parse client data
      const { osName } = usersService.parseUserAgent(req);

      // Send login activity email to user
      await emailService.sendLoginActivityEmail(
        user.favLang,
        user.email,
        user.name,
        osName
      );

      // Send notification to user
      await usersService.sendNotification(
        [user._id],
        userNotifications.newLoginActivity(user.lastLogin)
      );

      // Add login activity to user
      await loginActivitiesService.createLoginActivity(req, user);
    } else {
      // Send welcoming email
      await emailService.sendWelcomingEmail(
        user.favLang,
        user.email,
        user.name
      );
    }

    // TODO: send phone activation code to user's phone.

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

module.exports.loginWithEmail = async (req, res, next) => {
  try {
    const { lang, emailOrPhone, password, deviceToken } = req.body;

    // Find user with provided credentials
    const { user, isDeleted } = await authService.loginWithEmail(
      emailOrPhone,
      password,
      deviceToken,
      lang
    );

    // Parse client data
    const { osName } = usersService.parseUserAgent(req);

    if (isDeleted) {
      // Send welcome back email to user
      await emailService.sendWelcomeBackEmail(
        user.favLang,
        user.email,
        user.name
      );
    } else {
      // Send login activity email to user
      await emailService.sendLoginActivityEmail(
        user.favLang,
        user.email,
        user.name,
        osName
      );

      // Send notification to user
      await usersService.sendNotification(
        [user._id],
        userNotifications.newLoginActivity(user.lastLogin)
      );
    }

    // Add login activity to user
    await loginActivitiesService.createLoginActivity(req, user);

    // Create the response object
    const response = {
      user: _.pick(user, clientSchema),
      token: user.genAuthToken(),
    };

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.loginWithGoogle = async (req, res, next) => {
  try {
    const { lang, googleToken, deviceToken } = req.body;

    // Find user by google email
    const { user, isDeleted } = await authService.loginWithGoogle(
      googleToken,
      deviceToken,
      lang
    );

    if (isDeleted) {
      // Send welcome back email to user
      await emailService.sendWelcomeBackEmail(
        user.favLang,
        user.email,
        user.name
      );
    } else {
      // Send login activity email to user
      await emailService.sendLoginActivityEmail(
        user.favLang,
        user.email,
        user.name,
        osName
      );

      // Send notification to user
      await usersService.sendNotification(
        [user._id],
        userNotifications.newLoginActivity(user.lastLogin)
      );
    }

    // Add login activity to user
    await loginActivitiesService.createLoginActivity(req, user);

    // Create the response object
    const response = {
      user: _.pick(user, clientSchema),
      token: user.genAuthToken(),
    };

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};
