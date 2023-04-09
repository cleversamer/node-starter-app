const { reviewsService, excelService } = require("../../services");
const httpStatus = require("http-status");
const { clientSchema } = require("../../models/system/review.model");
const _ = require("lodash");

//////////////////// COMMON CONTROLLERS ////////////////////
module.exports.addReview = async (req, res, next) => {
  try {
    const user = req.user;
    const { content } = req.body;

    // Create the review
    const review = await reviewsService.addReview(user, content);

    // Create the response object
    const response = _.pick(review, clientSchema);

    // Send response back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.getMyReviews = async (req, res, next) => {
  try {
    const user = req.user;
    const { page, limit } = req.query;

    // Create the review
    const { currentPage, totalPages, reviews } =
      await reviewsService.getMyReviews(user._id, page, limit);

    // Create the response object
    const response = {
      currentPage,
      totalPages,
      reviews: reviews.map((review) => _.pick(review, clientSchema)),
    };

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.updateMyReview = async (req, res, next) => {
  try {
    const user = req.user;
    const { content } = req.body;
    const { reviewId } = req.params;

    // Update review
    const review = await reviewsService.updateMyReview(user, reviewId, content);

    // Create the response object
    const response = _.pick(review, clientSchema);

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

//////////////////// ADMIN CONTROLLERS ////////////////////
module.exports.getAllReviews = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    // Find reviews in the given page
    const { currentPage, totalPages, reviews } =
      await reviewsService.getAllReviews(page, limit);

    // Create the response object
    const response = {
      currentPage,
      totalPages,
      reviews: reviews.map((review) => _.pick(review, clientSchema)),
    };

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.getUserReviews = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { page, limit } = req.query;

    // Find reviews in the given page
    const { currentPage, totalPages, reviews } =
      await reviewsService.getUserReviews(userId, page, limit);

    // Create the response object
    const response = {
      currentPage,
      totalPages,
      reviews: reviews.map((review) => _.pick(review, clientSchema)),
    };

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.exportAllReviews = async (req, res, next) => {
  try {
    // Find all reviews in the system
    const reviews = await reviewsService.getAllMappedReviews();

    // Put all reviews in an Excel file
    const filePath = await excelService.exportReviewsToExcelFile(reviews);

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

