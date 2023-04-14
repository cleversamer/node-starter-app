const { ServerError } = require("../../models/system/serverError.model");

//////////////////// INNER SERVICES ////////////////////
module.exports.storeError = async (systemError, request) => {
  try {
    // Check if error happened before
    const happenedError = await ServerError.findOne({
      name: systemError.name,
      message: systemError.message,
      stackTrace: systemError.stack,
    });

    if (happenedError) {
      // Add occur to the error
      happenedError.addOccur();

      // Save error to the DB
      await happenedError.save();

      return happenedError;
    }

    // Create the error
    const error = new ServerError({
      requestURL: request.originalUrl,
      name: systemError.name,
      message: systemError.message,
      stackTrace: systemError.stack,
      date: new Date(),
    });

    // Save error to the DB
    await error.save();

    return error;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllErrorsList = async () => {
  try {
    // Find all errors
    return await ServerError.find({}).sort({ _id: -1 });
  } catch (err) {
    throw err;
  }
};

module.exports.getAllErrorsCount = async () => {
  try {
    return await ServerError.count({});
  } catch (err) {
    throw err;
  }
};

//////////////////// ADMIN SERVICES ////////////////////
module.exports.getAllErrors = async (page, limit) => {
  try {
    // Parse numeric string parameters
    page = parseInt(page);
    limit = parseInt(limit);

    // Find errors in the given page
    const systemErrors = await ServerError.find({})
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // Get the count of all user's revies
    const count = await ServerError.count({});

    return {
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      systemErrors,
    };
  } catch (err) {
    throw err;
  }
};

module.exports.resolveError = async (errorId) => {
  try {
    // Delete error from DB
    return await ServerError.findByIdAndDelete(errorId);
  } catch (err) {
    throw err;
  }
};
