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
  "favLang",
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
    // User's favorite language
    favLang: {
      type: String,
      enum: config.favLanguages,
      default: config.favLanguages[0],
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
    isDeleted: {
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

//////////////////// User's General Methods ////////////////////
userSchema.methods.genAuthToken = function () {
  const body = {
    sub: this._id.toHexString(),
    email: this.email,
    phone: this.phone.full,
    password: this.password + server.PASSWORD_SALT,
  };

  return jwt.sign(body, process.env["JWT_PRIVATE_KEY"]);
};

userSchema.methods.switchLanguage = function () {
  this.favLang = this.favLang === "en" ? "ar" : "en";
};

userSchema.methods.updateLanguage = function (lang) {
  // Check if `lang` param exists
  if (!lang) {
    return;
  }

  this.favLang = lang;
};

userSchema.methods.updateLastLogin = function () {
  this.lastLogin = new Date();
};

userSchema.methods.genCode = function (length = 4) {
  const possibleNums = Math.pow(10, length - 1);
  return Math.floor(possibleNums + Math.random() * 9 * possibleNums);
};

userSchema.methods.updateCode = function (key) {
  const { codeLength, expiryInMins } = verification[key];

  // Generate code
  const code = this.genCode(codeLength);

  // Generate expiry date
  const mins = expiryInMins * 60 * 1000;
  const expiryDate = new Date() + mins;

  // Update email verification code
  this.verification[key] = { code, expiryDate };
};

userSchema.methods.isMatchingCode = function (key, code) {
  return this.verification[key].code == code;
};

userSchema.methods.isValidCode = function (key) {
  const { expiryDate } = this.verification[key];
  const { expiryInMins } = verification[key];

  // Measure the difference between now and code's expiry date
  const diff = new Date() - new Date(expiryDate);

  // Calculate expiry mins in milliseconds
  const time = expiryInMins * 60 * 1000;

  // Return true if milliseconds are greater than the difference
  // Otherwise, return false...
  return diff <= time;
};

userSchema.methods.isEmailVerified = function () {
  return this.verified.email;
};

userSchema.methods.verifyEmail = function () {
  this.verified.email = true;
};

userSchema.methods.isPhoneVerified = function () {
  return this.verified.phone;
};

userSchema.methods.verifyPhone = function () {
  this.verified.phone = true;
};

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

userSchema.methods.addNotification = function (notification) {
  const { maxNotificationsCount } = config;
  // Making sure that the max notifications count
  // is considered.
  this.notifications = this.notifications.slice(0, maxNotificationsCount);
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

userSchema.methods.updateDeviceToken = function (deviceToken) {
  // Check if `deviceToken` param exists
  if (!deviceToken) {
    return;
  }

  // Update user's device token
  this.deviceToken = deviceToken;
};

userSchema.methods.markAsDeleted = function () {
  this.isDeleted = true;
};

userSchema.methods.restoreAccount = function () {
  // Mark account as not deleted
  this.isDeleted = false;

  // Clear account deletion code
  this.verification.deletion = { code: "", expiryDate: null };
};

userSchema.methods.hasGoogleAvatar = function () {
  return this.avatarURL.includes("googleusercontent.com");
};

userSchema.methods.clearAvatarURL = function () {
  this.avatarURL = "";
};

userSchema.methods.addRequest = function () {
  this.noOfRequests = this.noOfRequests + 1;
};

const User = model("User", userSchema);

module.exports = {
  User,
  clientSchema,
};
