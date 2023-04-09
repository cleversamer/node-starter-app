const express = require("express");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const upload = require("express-fileupload");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const { limitHandler } = require("../middleware/apiError");
const { server } = require("../config/system");
const errors = require("../config/errors");
const httpStatus = require("http-status");

// The following configuration will limit the number of requests
// for each IP address per a certain amount of time.
const limiter = rateLimit({
  windowMs: server.MAX_REQUESTS.PER_MILLISECONDS,
  max: server.MAX_REQUESTS.NUMBER,
  message: {
    status: "error",
    statusCode: httpStatus.FORBIDDEN,
    message: errors.system.tempBlocked,
  },
});

const uploader = upload({
  limits: { fileSize: server.MAX_FILE_UPLOAD_SIZE * 1024 * 1024 },
  abortOnLimit: true,
  limitHandler,
});

module.exports = (app) => {
  app.use(limiter);
  app.use(uploader);
  app.use(express.json({ limit: `${server.MAX_REQ_BODY_SIZE}kb` }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("uploads"));
  app.use(helmet());
  app.use(cors({ origin: true }));
  app.use(xss());
  app.use(mongoSanitize());
};
