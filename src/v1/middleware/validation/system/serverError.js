const commonMiddleware = require("../common");

module.exports.validateGetAllErrors = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkPage,
  commonMiddleware.checkLimit,
  commonMiddleware.next,
];

module.exports.validateResolveError = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkErrorId,
  commonMiddleware.next,
];
