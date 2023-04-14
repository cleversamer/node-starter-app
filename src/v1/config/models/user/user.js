module.exports = {
  name: { minLength: 5, maxLength: 64 },
  email: { minLength: 5, maxLength: 256 },
  phone: {
    nsn: { minLength: 4, maxLength: 13 },
  },
  deviceToken: { minLength: 0, maxLength: 1024, default: "" },
  // First role in this array === default role
  roles: ["user", "admin"],
  registerRoles: ["user"],
  // First auth type in this array === default auth type
  authTypes: ["email", "google"],
  password: { minLength: 8, maxLength: 128 },
  verificationCode: { exactLength: 6 },
  receiverTypes: ["email", "phone"],
  maxNotificationsCount: 30,
  // First value is the default value
  languages: ["en", "ar"],
  // First value is the default value
  displayModes: ["light", "dark", "dim"],
  notificationTitle: { min: 3, max: 128 },
  notificationBody: { min: 3, max: 265 },
};
