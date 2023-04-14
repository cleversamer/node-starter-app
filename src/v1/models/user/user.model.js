const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { server } = require("../../config/system");
const { user: config } = require("../../config/models");
const countriesData = require("../../data/countries");

const clientSchema = [
  "_id",
  "avatarURL",
  "name",
  "email",
  "phone",
  "role",
  "verified",
  "display",
  "notifications",
  "lastLogin",
];

const verification = {
  email: {
    expiryInMins: 10,
    codeLength: config.verificationCode.exactLength,
  },
  phone: {
    expiryInMins: 10,
    codeLength: config.verificationCode.exactLength,
  },
  password: {
    expiryInMins: 10,
    codeLength: config.verificationCode.exactLength,
  },
  deletion: {
    expiryInMins: 10,
    codeLength: config.verificationCode.exactLength,
  },
};

const userSchema = new Schema(
  {
    // User's first authentication type
    authType: {
      type: String,
      required: true,
      trim: true,
      enum: config.authTypes,
      default: config.authTypes[0],
    },
    // User's avatar URL
    avatarURL: {
      type: String,
      default: "",
    },
    // User's full name
    name: {
      type: String,
      trim: true,
      required: true,
    },
    // The email of the user
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: config.email.minLength,
      maxLength: config.email.maxLength,
    },
    // The phone of the user
    phone: {
      // The full phone number (icc + nsn)
      full: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: countriesData.minPhone,
        maxlength: countriesData.maxPhone,
      },
      // The icc of user's phone
      icc: {
        type: String,
        required: true,
        trim: true,
        enum: countriesData.countries.map((c) => c.icc),
        minlength: countriesData.minICC,
        maxlength: countriesData.maxICC,
      },
      // The nsn of user's phone
      nsn: {
        type: String,
        required: true,
        trim: true,
        minLength: countriesData.minNSN,
        maxLength: countriesData.maxNSN,
      },
    },
    // The hashed password of the user
    password: {
      type: String,
      trim: true,
      default: "",
    },
    // The role of the user
    role: {
      type: String,
      enum: config.roles,
      default: config.roles[0],
    },
    // User's display settings
    display: {
      // User's display language
      language: {
        type: String,
        required: true,
        trim: true,
        enum: config.languages,
        default: config.languages[0],
      },
      // User's display mode
      mode: {
        type: String,
        required: true,
        trim: true,
        enum: config.displayModes,
        default: config.displayModes[0],
      },
    },
    // The email and phone verification status of the user
    verified: {
      email: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: Boolean,
        default: false,
      },
    },
    // The notifications of the user
    notifications: {
      type: Array,
      default: [],
    },
    // The device token of the user (Used for sending notifications to it)
    deviceToken: {
      type: String,
      minLength: config.deviceToken.minLength,
      maxLength: config.deviceToken.maxLength,
      default: "",
    },
    // The last login date of the user
    lastLogin: {
      type: Date,
      default: new Date(),
    },
    // Shows if account is deleted or not
    deleted: {
      type: Boolean,
      default: false,
    },
    // The number of requests the user has made
    noOfRequests: {
      type: Number,
      default: 0,
    },
    // The email, phone, and password verification codes
    verification: {
      email: {
        code: {
          type: String,
          default: "",
        },
        expiryDate: {
          type: Date,
          default: "",
        },
      },
      phone: {
        code: {
          type: String,
          default: "",
        },
        expiryDate: {
          type: Date,
          default: "",
        },
      },
      password: {
        code: {
          type: String,
          default: "",
        },
        expiryDate: {
          type: Date,
          default: "",
        },
      },
      deletion: {
        code: {
          type: String,
          default: "",
        },
        expiryDate: {
          type: Date,
          default: "",
        },
      },
    },
  },
  {
    // To not avoid empty object when creating the document
    minimize: false,
    // To automatically write creation/update timestamps
    // Note: the update timestamp will be updated automatically
    timestamps: true,
  }
);

//////////////////// User Methods ////////////////////

//////////////////// AUTH TYPE ////////////////////
userSchema.methods.getAuthType = function () {
  return this.authType;
};

//////////////////// AVATAR ////////////////////
userSchema.methods.hasGoogleAvatar = function () {
  return this.avatarURL.includes("googleusercontent.com");
};

userSchema.methods.clearAvatarURL = function () {
  this.avatarURL = "";
};

userSchema.methods.updateAvatarURL = function (avatarURL) {
  this.avatarURL = avatarURL || "";
};

userSchema.methods.getAvatarURL = function () {
  return this.avatarURL;
};

//////////////////////// NAME ////////////////////////
userSchema.methods.updateName = function (name) {
  this.name = name;
};

userSchema.methods.getName = function () {
  return this.name;
};

userSchema.methods.compareName = function (name) {
  return this.name === name;
};

//////////////////////// EMAIL ////////////////////////
userSchema.methods.isEmailVerified = function () {
  return this.verified.email;
};

userSchema.methods.verifyEmail = function () {
  this.verified.email = true;
};

userSchema.methods.unverifyEmail = function () {
  this.verified.email = false;
};

userSchema.methods.updateEmail = function (email) {
  this.email = email;
};

userSchema.methods.getEmail = function () {
  return this.email;
};

//////////////////////// PHONE ////////////////////////
userSchema.methods.isPhoneVerified = function () {
  return this.verified.phone;
};

userSchema.methods.verifyPhone = function () {
  this.verified.phone = true;
};

userSchema.methods.unverifyPhone = function () {
  this.verified.phone = false;
};

userSchema.methods.updatePhone = function (icc, nsn) {
  this.phone = {
    full: `${icc}${nsn}`,
    icc,
    nsn,
  };
};

userSchema.methods.getPhone = function () {
  return this.phone.full;
};

userSchema.methods.getPhoneICC = function () {
  return this.phone.icc;
};

userSchema.methods.getPhoneNSN = function () {
  return this.phone.nsn;
};

//////////////////////// ROLE ////////////////////////
userSchema.methods.getRole = function () {
  return this.role;
};

userSchema.methods.isAdmin = function () {
  return this.role === "admin";
};

userSchema.methods.updateRole = function (role) {
  this.role = role;
};

//////////////////////// LANGUAGE ////////////////////////
userSchema.methods.switchLanguage = function () {
  this.display.language = this.display.language === "en" ? "ar" : "en";
};

userSchema.methods.updateLanguage = function (lang) {
  // Check if `lang` param exists
  if (!lang) {
    return;
  }

  this.display.language = lang;
};

userSchema.methods.getLanguage = function () {
  return this.display.language;
};

//////////////////////// NOTIFICATIONS ////////////////////////
userSchema.methods.addNotification = function (notification) {
  const { maxNotificationsCount } = config;

  // Make sure that the max notifications count is considered.
  this.notifications = this.notifications.slice(0, maxNotificationsCount);

  // If the max count reached then we remove the oldest one.
  if (this.notifications.length === maxNotificationsCount) {
    this.notifications.pop();
  }

  // Add the notification to the beginning of the array
  this.notifications.unshift(notification);
};

userSchema.methods.seeNotifications = function () {
  // Return `true` if there are no notifications
  // True means no new notifications
  if (!this.notifications.length) {
    return true;
  }

  const list = [...this.notifications];

  // Declare a variable to track unseen notifications
  let isAllSeen = true;

  // Mark all notification as seen
  this.notifications = this.notifications.map((n) => {
    isAllSeen = isAllSeen && n.seen;

    return {
      ...n,
      seen: true,
    };
  });

  // Return the result
  return { isAllSeen, list };
};

userSchema.methods.clearNotifications = function () {
  const isEmpty = !this.notifications.length;
  this.notifications = [];
  return isEmpty;
};

userSchema.methods.hasReceivedNotification = function (notification) {
  // Check if user has received this notification
  // and didn't saw it
  const index = this.notifications.findIndex(
    (n) =>
      n.title.en === notification.title.en &&
      n.title.ar === notification.title.ar &&
      n.body.en === notification.body.en &&
      n.body.ar === notification.body.ar &&
      !n.seen
  );

  // This means that the current user hasn't received
  // this notification yet, or they have received it
  // and read it.
  return index === -1;
};

//////////////////////// DEVICE TOKEN ////////////////////////
userSchema.methods.updateDeviceToken = function (deviceToken) {
  // Check if `deviceToken` param exists
  if (!deviceToken) {
    return;
  }

  // Update user's device token
  this.deviceToken = deviceToken;
};

userSchema.methods.getDeviceToken = function () {
  return this.this.deviceToken;
};

//////////////////////// TOKEN ////////////////////////
userSchema.methods.genAuthToken = function () {
  const body = {
    sub: this._id.toHexString(),
    email: this.email,
    phone: this.phone.full,
    password: this.password + server.PASSWORD_SALT,
  };

  return jwt.sign(body, process.env["JWT_PRIVATE_KEY"]);
};

//////////////////////// LAST LOGIN ////////////////////////
userSchema.methods.updateLastLogin = function () {
  this.lastLogin = new Date();
};

userSchema.methods.getLastLogin = function () {
  return this.lastLogin;
};

//////////////////////// VERIFICATION CODES ////////////////////////
userSchema.methods.genCode = function (length = 4) {
  const possibleNums = Math.pow(10, length - 1);
  return Math.floor(possibleNums + Math.random() * 9 * possibleNums);
};

userSchema.methods.updateCode = function (key) {
  const { codeLength, expiryInMins } = verification[key];

  // Generate code
  const code = this.genCode(codeLength);

  // Generate expiry date
  // const mins = expiryInMins * 60 * 1000;
  // const expiryDate = new Date() + mins;
  const mins = expiryInMins * 60 * 1000;
  const expiryDate = new Date(Date.now() + mins);

  // Update email verification code
  this.verification[key] = { code, expiryDate };
};

userSchema.methods.isMatchingCode = function (key, code) {
  return this.verification[key].code == code;
};

userSchema.methods.isValidCode = function (key) {
  const { expiryDate } = this.verification[key];

  // Check if the now date is before the expiry date
  return new Date() < expiryDate;
};

userSchema.methods.getCode = function (key) {
  return this.verification[key].code;
};

userSchema.methods.getCodeRemainingTime = function (key) {
  const { expiryDate } = this.verification[key];

  // Calculate difference in milliseconds between now
  // and expiry date
  const diffInMs = expiryDate - new Date();

  if (diffInMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  // Calculate remaining seconds with fractions
  const diffInSec = Math.floor(diffInMs / 1000);

  // Calculate remaining days
  const days = Math.floor(diffInSec / (3600 * 24));

  // Calculate remaining hours
  const hours = Math.floor((diffInSec % (3600 * 24)) / 3600);

  // Calculate remaining minutes
  const minutes = Math.floor((diffInSec % 3600) / 60);

  // Calculate remaining seconds without fractions
  const seconds = Math.floor(diffInSec % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

//////////////////////// PASSWORD ////////////////////////
userSchema.methods.comparePassword = async function (candidate) {
  // Check if user doesn't have a password
  // and the candidate password argument
  // is also an empty string
  if (!this.password && !candidate) {
    return true;
  }

  // Otherwise, compare candidate password with the current password
  return await bcrypt.compare(candidate, this.password);
};

userSchema.methods.updatePassword = async function (newPassword) {
  const salt = await bcrypt.genSalt(11);
  const hashed = await bcrypt.hash(newPassword, salt);
  this.password = hashed;
};

userSchema.methods.hasPassword = function () {
  return !!this.password;
};

//////////////////////// ACCOUNT STATUS ////////////////////////
userSchema.methods.markAsDeleted = function () {
  this.deleted = true;
};

userSchema.methods.isDeleted = function () {
  return this.deleted;
};

userSchema.methods.restoreAccount = function () {
  // Mark account as not deleted
  this.deleted = false;

  // Clear account deletion code
  this.verification.deletion = { code: "", expiryDate: null };
};

//////////////////////// USER'S MADE REQUESTS ////////////////////////
userSchema.methods.addRequest = function () {
  this.noOfRequests = this.noOfRequests + 1;
};

const User = model("User", userSchema);

module.exports = {
  User,
  clientSchema,
};
