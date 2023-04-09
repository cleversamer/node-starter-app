module.exports = Object.freeze({
  user: {
    "read:own": ["*"],
    "update:own": ["*"],
    "delete:own": ["*"],
  },
  emailVerificationCode: {
    "read:own": ["*"],
    "update:own": ["*"],
  },
  phoneVerificationCode: {
    "read:own": ["*"],
    "update:own": ["*"],
  },
  password: {
    "update:own": ["*"],
  },
  notification: {
    "read:own": ["*"],
    "delete:own": ["*"],
  },
  loginActivity: {
    "read:own": ["*"],
  },
  review: {
    "create:own": ["*"],
    "read:own": ["*"],
    "update:own": ["*"],
  },
});
