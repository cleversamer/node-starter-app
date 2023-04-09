const nodemailer = require("nodemailer");
const { mail } = require("../../config/system");
const httpStatus = require("http-status");
const errors = require("../../config/errors");
const { ApiError } = require("../../middleware/apiError");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: mail.auth.user,
    pass: mail.auth.password,
  },
});

module.exports.sendWelcomingEmail = async (lang, email, name) => {
  try {
    if (!["ar", "en"].includes(lang)) {
      lang = "en";
    }

    const {
      subject,
      emailBody: { title },
    } = mail.types.welcoming;

    const html = title[lang](name);

    const message = mail.getMessage(lang, email, html, subject[lang]);

    await transporter.sendMail(message);
    return true;
  } catch (err) {
    throw err;
  }
};

module.exports.sendEmailVerifiedEmail = async (lang, email, name) => {
  try {
    if (!["ar", "en"].includes(lang)) {
      lang = "en";
    }

    const {
      subject,
      emailBody: { title },
    } = mail.types.emailVerified;

    const html = title[lang](name);

    const message = mail.getMessage(lang, email, html, subject[lang]);

    await transporter.sendMail(message);
    return true;
  } catch (err) {
    throw err;
  }
};

module.exports.sendVerificationCodeEmail = async (
  lang,
  email,
  emailCode,
  name,
  verificationLink
) => {
  try {
    if (!["ar", "en"].includes(lang)) {
      lang = "en";
    }

    const {
      subject,
      emailBody: { title },
    } = mail.types.verifyEmail;

    const html = title[lang](name, emailCode, verificationLink);

    const message = mail.getMessage(lang, email, html, subject[lang]);

    await transporter.sendMail(message);
    return true;
  } catch (err) {
    throw err;
  }
};

module.exports.sendChangeEmail = async (lang, email, emailCode, name) => {
  try {
    if (!["ar", "en"].includes(lang)) {
      lang = "en";
    }

    const {
      subject,
      emailBody: { title },
    } = mail.types.changeEmail;

    const html = title[lang](name, emailCode);

    const message = mail.getMessage(lang, email, html, subject[lang]);

    await transporter.sendMail(message);
    return true;
  } catch (err) {
    throw err;
  }
};

module.exports.sendForgotPasswordEmail = async (
  lang,
  email,
  passwordCode,
  name
) => {
  try {
    if (!["ar", "en"].includes(lang)) {
      lang = "en";
    }

    const {
      subject,
      emailBody: { title },
    } = mail.types.forgotPassword;

    const html = title[lang](name, passwordCode);

    const message = mail.getMessage(lang, email, html, subject[lang]);

    await transporter.sendMail(message);
    return true;
  } catch (err) {
    throw err;
  }
};

module.exports.sendAccountDeletionCodeEmail = async (
  lang,
  email,
  name,
  deletionLink
) => {
  try {
    if (!["ar", "en"].includes(lang)) {
      lang = "en";
    }

    const {
      subject,
      emailBody: { title },
    } = mail.types.deleteAccount;

    const html = title[lang](name, deletionLink);

    const message = mail.getMessage(lang, email, html, subject[lang]);

    await transporter.sendMail(message);
    return true;
  } catch (err) {
    throw err;
  }
};

module.exports.sendAccountDeletedEmail = async (lang, email, name) => {
  try {
    if (!["ar", "en"].includes(lang)) {
      lang = "en";
    }

    const {
      subject,
      emailBody: { title },
    } = mail.types.accountDeleted;

    const html = title[lang](name);

    const message = mail.getMessage(lang, email, html, subject[lang]);

    await transporter.sendMail(message);
    return true;
  } catch (err) {
    throw err;
  }
};

module.exports.sendPasswordChangedEmail = async (lang, email, name) => {
  try {
    if (!["ar", "en"].includes(lang)) {
      lang = "en";
    }

    const {
      subject,
      emailBody: { title },
    } = mail.types.changePassword;

    const html = title[lang](name);

    const message = mail.getMessage(lang, email, html, subject[lang]);

    await transporter.sendMail(message);
    return true;
  } catch (err) {
    throw err;
  }
};

module.exports.sendLoginActivityEmail = async (lang, email, name, os) => {
  try {
    if (!["ar", "en"].includes(lang)) {
      lang = "en";
    }

    const {
      subject,
      emailBody: { title },
    } = mail.types.loginActivity;

    const html = title[lang](name, os);

    const message = mail.getMessage(lang, email, html, subject[lang]);

    await transporter.sendMail(message);
    return true;
  } catch (err) {
    throw err;
  }
};

module.exports.sendWelcomeBackEmail = async (lang, email, name) => {
  try {
    if (!["ar", "en"].includes(lang)) {
      lang = "en";
    }

    const {
      subject,
      emailBody: { title },
    } = mail.types.welcomeBack;

    const html = title[lang](name);

    const message = mail.getMessage(lang, email, html, subject[lang]);

    await transporter.sendMail(message);
    return true;
  } catch (err) {
    throw err;
  }
};
