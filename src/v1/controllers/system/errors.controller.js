const { clientSchema } = require("../../models/system/serverError.model");
const { errorsService, excelService } = require("../../services");
const { ApiError } = require("../../middleware/apiError");
const httpStatus = require("http-status");
const errors = require("../../config/errors");
const _ = require("lodash");

//////////////////// ADMIN CONTROLLERS ////////////////////
module.exports.getAllErrors = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    // Find errors in the given page
    const { currentPage, totalPages, systemErrors } =
      await errorsService.getAllErrors(page, limit);

    // Check if there are no errors
    if (!systemErrors || !systemErrors.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.serverError.noServerErrors;
      throw new ApiError(statusCode, message);
    }

    // Create the response object
    const response = {
      currentPage,
      totalPages,
      systemErrors: systemErrors.map((error) => _.pick(error, clientSchema)),
    };

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.exportAllErrors = async (req, res, next) => {
  try {
    // Find all reviews in the system
    const systemErrors = await errorsService.getAllErrorsList();

    // Check if there are no errors
    if (!systemErrors || !systemErrors.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.serverError.noServerErrors;
      throw new ApiError(statusCode, message);
    }

    // Put all reviews in an Excel file
    const filePath = await excelService.exportErrorsToExcelFile(systemErrors);

    // Create the response object
    const response = {
      type: "file/xlsx",
      path: filePath,
    };

    // Send response back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.resolveError = async (req, res, next) => {
  try {
    const { errorId } = req.params;

    // Find error by ID and delete
    const systemError = await errorsService.resolveError(errorId);

    if (!systemError) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.serverError.notFound;
      throw new ApiError(statusCode, message);
    }

    // Create the response object
    const response = _.pick(systemError, clientSchema);

    // Send the response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};
