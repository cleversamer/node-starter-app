const { allRights } = require("./common");

module.exports = Object.freeze({
  user: allRights,
  emailVerificationCode: allRights,
  phoneVerificationCode: allRights,
  password: allRights,
  notification: allRights,
  loginActivity: allRights,
  review: allRights,
  error: allRights,
});
