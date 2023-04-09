const { ErrorModel } = require("../../models/system/error.model");

module.exports.storeError = async (systemError, request) => {
  try {
    const userId = request?.user?._id || null;
    const requestURL = request.originalUrl;

    // Create the error
    const error = new ErrorModel({
      userId,
      requestURL,
      message: systemError.message,
      stackTrace: systemError.stack,
      date: new Date(),
    });

    // Save error to the DB
    await error.save();

    return true;
  } catch (err) {
    await this.storeError(err);
  }
};

module.exports.deleteError = async (errorId) => {
  try {
    // Delete error from DB
    await ErrorModel.findByIdAndDelete(errorId);
  } catch (err) {
    throw err;
  }
};
