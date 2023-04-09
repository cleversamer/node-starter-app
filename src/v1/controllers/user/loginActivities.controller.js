const {
  loginActivitiesService,
  excelService,
  usersService,
} = require("../../services");
const httpStatus = require("http-status");
const { clientSchema } = require("../../models/user/loginActivity.model");
const _ = require("lodash");

//////////////////// COMMON CONTROLLERS ////////////////////
module.exports.getMyLoginActivities = async (req, res, next) => {
  try {
    const user = req.user;
    const { page, limit } = req.query;

    // Find user's login activities
    const { currentPage, totalPages, loginActivities } =
      await loginActivitiesService.getLoginActivities(user._id, page, limit);

    // Create the response object
    const response = {
      currentPage,
      totalPages,
      loginActivities: loginActivities.map((la) => _.pick(la, clientSchema)),
    };

    // Send the response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.exportMyLoginActivities = async (req, res, next) => {
  try {
    const user = req.user;

    // Get user's login activities
    const loginActivities = await loginActivitiesService.getUserLoginActivities(
      user._id
    );

    // Put user's login activities in an Excel file
    const filePath = await excelService.exportLoginActivitiesToExcelFile(
      user,
      loginActivities
    );

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

//////////////////// ADMIN CONTROLLERS ////////////////////
module.exports.getUserLoginActivities = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { page, limit } = req.query;

    // Find user's login activities
    const { currentPage, totalPages, loginActivities } =
      await loginActivitiesService.getLoginActivities(userId, page, limit);

    // Create the response object
    const response = {
      currentPage,
      totalPages,
      loginActivities: loginActivities.map((la) => _.pick(la, clientSchema)),
    };

    // Send the response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.exportUserLoginActivities = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Find user
    const user = await usersService.findUserById(userId, true);

    // Get user's login activities
    const loginActivities = await loginActivitiesService.getUserLoginActivities(
      user._id
    );

    // Put user's login activities in an Excel file
    const filePath = await excelService.exportLoginActivitiesToExcelFile(
      user,
      loginActivities
    );

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
