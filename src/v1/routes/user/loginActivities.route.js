const router = require("express").Router();
const { loginActivitiesController } = require("../../controllers");
const { loginActivityValidator } = require("../../middleware/validation");
const auth = require("../../middleware/auth");

//////////////////// COMMON ROUTES ////////////////////
router.get(
  "/my",
  loginActivityValidator.validateGetMyLoginActivities,
  auth("readOwn", "loginActivity"),
  loginActivitiesController.getMyLoginActivities
);

router.get(
  "/my/export",
  auth("readOwn", "loginActivity"),
  loginActivitiesController.exportMyLoginActivities
);

//////////////////// ADMIN ROUTES ////////////////////
router.get(
  "/:userId/get",
  loginActivityValidator.validateGetUserLoginActivities,
  auth("readAny", "loginActivity"),
  loginActivitiesController.getUserLoginActivities
);

router.get(
  "/:userId/export",
  loginActivityValidator.validateExportUserLoginActivities,
  auth("readAny", "loginActivity"),
  loginActivitiesController.exportUserLoginActivities
);

module.exports = router;
