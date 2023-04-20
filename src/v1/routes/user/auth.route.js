const router = require("express").Router();
const { authController } = require("../../controllers");
const { authValidator } = require("../../middleware/validation");

//////////////////// REGISTER ////////////////////
router.post(
  "/register/email",
  authValidator.validateRegisterWithEmail,
  authController.registerWithEmail
);

router.post(
  "/register/google",
  authValidator.validateRegisterWithGoogle,
  authController.registerWithGoogle
);

//////////////////// LOGIN ////////////////////
router.post(
  "/login/any",
  authValidator.validateLoginWithEmailOrPhone,
  authController.loginWithEmailOrPhone
);

router.post(
  "/login/email",
  authValidator.validateLoginWithEmail,
  authController.loginWithEmailOrPhone
);

router.post(
  "/login/phone",
  authValidator.validateLoginWithPhone,
  authController.loginWithEmailOrPhone
);

router.post(
  "/login/google",
  authValidator.validateLoginWithGoogle,
  authController.loginWithGoogle
);

module.exports = router;
