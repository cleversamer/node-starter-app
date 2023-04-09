const setupSanitization = require("./sanitize");
const setupMongoDB = require("./db");
const socket = require("./socket");
const routes = require("../routes");
const { server } = require("../config/system");
const {
  errorHandler,
  errorConverter,
  unsupportedRouteHandler,
} = require("../middleware/apiError");
const passport = require("passport");
const { jwtStrategy } = require("../middleware/passport");
const setupScheduling = require("./scheduling");

module.exports = (app) => {
  setupMongoDB();
  setupSanitization(app);
  app.use(passport.initialize());
  passport.use("jwt", jwtStrategy);
  app.use("/api", routes);
  app.use(unsupportedRouteHandler);
  app.use(errorConverter);
  app.use(errorHandler);

  const expressServer = app.listen(server.PORT, () => {
    console.log(`App is listening on port ${server.PORT}`);
  });

  socket(expressServer);

  setupScheduling();
};
