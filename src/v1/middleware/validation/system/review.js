const commonMiddleware = require("../common");

module.exports.validateAddReview = [
  commonMiddleware.checkReviewContent,
  commonMiddleware.next,
];

module.exports.validateGetMyRevies = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkPage,
  commonMiddleware.checkLimit,
  commonMiddleware.next,
];

module.exports.validateUpdateMyReview = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkReviewId,
  commonMiddleware.checkReviewContent,
  commonMiddleware.next,
];

module.exports.validateGetAllReviews = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkPage,
  commonMiddleware.checkLimit,
  commonMiddleware.next,
];

module.exports.validateGetUserReviews = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkUserId,
  commonMiddleware.checkPage,
  commonMiddleware.checkLimit,
  commonMiddleware.next,
];
