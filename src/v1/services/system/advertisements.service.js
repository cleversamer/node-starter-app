const { Advertisement } = require("../../models/system/advertisement.model");
const { ApiError } = require("../../middleware/apiError");
const httpStatus = require("http-status");
const errors = require("../../config/errors");

//////////////////// COMMON SERVICES ////////////////////
module.exports.getAllAdvertisements = async (page, limit) => {
  try {
    // Parse numeric string parameters
    page = parseInt(page);
    limit = parseInt(limit);

    // Find advertisements in the given page
    const advertisements = await Advertisement.find({})
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // Check if there are advertisements
    if (!advertisements || !advertisements.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.advertisement.noAdvertisements;
      throw new ApiError(statusCode, message);
    }

    // Get the count of all advertisements
    const count = await Advertisement.count({});

    return {
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      advertisements,
    };
  } catch (err) {
    throw err;
  }
};
