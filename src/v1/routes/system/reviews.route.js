const router = require("express").Router();
const { reviewsController } = require("../../controllers");
const { reviewValidator } = require("../../middleware/validation");
const auth = require("../../middleware/auth");

//////////////////// COMMON ROUTES ////////////////////
router.post(
  "/add",
  reviewValidator.validateAddReview,
  auth("createOwn", "review"),
  reviewsController.addReview
);

router.get(
  "/my",
  reviewValidator.validateGetMyRevies,
  auth("readOwn", "review"),
  reviewsController.getMyReviews
);

router.patch(
  "/:reviewId/update",
  reviewValidator.validateUpdateMyReview,
  auth("updateOwn", "review"),
  reviewsController.updateMyReview
);

//////////////////// ADMIN ROUTES ////////////////////
router.get(
  "/all",
  reviewValidator.validateGetAllReviews,
  auth("readAny", "review"),
  reviewsController.getAllReviews
);

router.get(
  "/:userId/get",
  reviewValidator.validateGetUserReviews,
  auth("readAny", "review"),
  reviewsController.getUserReviews
);

router.get(
  "/all/export",
  auth("readAny", "review"),
  reviewsController.exportAllReviews
);

module.exports = router;
