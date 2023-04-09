const router = require("express").Router();
const { authController } = require("../../controllers");
const { authValidator } = require("../../middleware/validation");

router.post(
  "/register/email",
  authValidator.registerWithEmailValidator,
  authController.registerWithEmail
);

router.post(
  "/register/google",
  authValidator.registerWithGoogleValidator,
  authController.registerWithGoogle
);

router.post(
  "/login/email",
  authValidator.loginWithEmailValidator,
  authController.loginWithEmail
);

router.post(
  "/login/google",
  authValidator.loginWithGoogleValidator,
  authController.loginWithGoogle
);

module.exports = router;
