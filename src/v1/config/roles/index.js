const AccessControl = require("accesscontrol");
const user = require("./user");
const admin = require("./admin");

const roles = new AccessControl({
  user,
  admin,
});

module.exports = roles;
