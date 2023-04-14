const commonMiddleware = require("../common");

module.exports.validateGetAllAdvertisements = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkPage,
  commonMiddleware.checkLimit,
  commonMiddleware.next,
];

module.exports.validateCreateAdvertisement = [commonMiddleware.next];
