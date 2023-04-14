const { clientSchema } = require("../../models/system/advertisement.model");
const { advertisementsService } = require("../../services");
const httpStatus = require("http-status");
const _ = require("lodash");

//////////////////// COMMON CONTROLLERS ////////////////////
module.exports.getAllAdvertisements = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    // Find advertisements at the given page
    const { currentPage, totalPages, advertisements } =
      await advertisementsService.getAllAdvertisements(page, limit);

    // Create the response object
    const response = {
      currentPage,
      totalPages,
      advertisements: advertisements.map((ad) => _.pick(ad, clientSchema)),
    };

    // Send the response back to client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

//////////////////// ADMIN CONTROLLERS ////////////////////
module.exports.createAdvertisement = async (req, res, next) => {
  try {
    const user = req.user;
    const {} = req.body;

    // Create advertisement
    const advertisement = await advertisementsService.createAdvertisement();

    // Create the response object
    const response = _.pick(advertisement, clientSchema);

    // Send the response back to client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};
