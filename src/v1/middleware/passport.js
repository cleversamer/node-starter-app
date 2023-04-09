const { User } = require("../models/user/user.model");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { server } = require("../config/system");

const jwtOptions = {
  secretOrKey: process.env["JWT_PRIVATE_KEY"],
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);

    const tokenPassword = payload.password.substring(0, user.password.length);
    const tokenPasswordSalt = payload.password.substring(user.password.length);

    const unauthorized =
      !user ||
      user.isDeleted ||
      tokenPassword !== user.password ||
      tokenPasswordSalt !== server.PASSWORD_SALT ||
      payload.email !== user.email ||
      payload.phone !== user.phone.full;

    return unauthorized ? done(null, false) : done(null, user);
  } catch (err) {
    done(err, false);
  }
};

module.exports.jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
