const commonMiddleware = require("../common");

module.exports.validateGetMyLoginActivities = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkPage,
  commonMiddleware.checkLimit,
  commonMiddleware.next,
];

module.exports.validateGetUserLoginActivities = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkUserId,
  commonMiddleware.checkPage,
  commonMiddleware.checkLimit,
  commonMiddleware.next,
];

module.exports.validateExportUserLoginActivities = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkUserId,
  commonMiddleware.next,
];
