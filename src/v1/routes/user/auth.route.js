const router = require("express").Router();
const { authController } = require("../../controllers");
const { authValidator } = require("../../middleware/validation");

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

router.post(
  "/login/email",
  authValidator.validateLoginWithEmail,
  authController.loginWithEmail
);

router.post(
  "/login/google",
  authValidator.validateLoginWithGoogle,
  authController.loginWithGoogle
);

module.exports = router;
