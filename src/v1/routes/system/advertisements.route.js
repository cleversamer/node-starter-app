const router = require("express").Router();
const { advertisementsController } = require("../../controllers");
const { advertisementValidator } = require("../../middleware/validation");
const auth = require("../../middleware/auth");

//////////////////// COMMON ROUTES ////////////////////
router.get(
  "/all",
  advertisementValidator.validateGetAllAdvertisements,
  advertisementsController.getAllAdvertisements
);

//////////////////// ADMIN ROUTES ////////////////////
router.post(
  "/add",
  advertisementValidator.validateCreateAdvertisement,
  auth("createAny", "advertisement"),
  advertisementsController.createAdvertisement
);

module.exports = router;
