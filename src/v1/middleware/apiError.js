const httpStatus = require("http-status");
const errors = require("../config/errors");
const errorsService = require("../services/system/serverErrors.service");

module.exports.ApiError = class ApiError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
};

module.exports.errorHandler = (err, req, res, next) => {
  res.status(err.statusCode).json({
    status: "error",
    ...err,
  });
};

module.exports.errorConverter = async (err, req, res, next) => {
  // Check if the error is an instance of `ApiError`
  if (!(err instanceof this.ApiError)) {
    // Decide error's status code
    const statusCode = httpStatus.INTERNAL_SERVER_ERROR;

    // Decide error's message
    const message = errors.system.internal;

    // Write error to the DB
    await errorsService.storeError(err, req);

    // Convert error to an `ApiError` instance
    err = new this.ApiError(statusCode, message);
  }

  // Pass the execution to the next middleware
  next(err);
};

module.exports.unsupportedRouteHandler = (req, res, next) => {
  const statusCode = httpStatus.BAD_GATEWAY;
  const message = errors.system.unsupportedRoute;
  throw new this.ApiError(statusCode, message);
};

module.exports.limitHandler = (req, res, next) => {
  const statusCode = httpStatus.FORBIDDEN;
  const message = errors.system.largeFile;
  next(new this.ApiError(statusCode, message));
};
