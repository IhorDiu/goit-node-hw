const express = require("express");

const authControllers = require("../../controllers/users");

const {
  authenticate,
  validateSubscription,
  upload,
} = require("../../middlewares");

const { validateBody } = require("../../utils");

const { schemas } = require("../../models/user");

const router = express.Router();

// signup
router.post(
  "/register",
  upload.single("avatar"),
  validateBody(schemas.registerSchema),
  authControllers.register
);

router.get("/verify/:verificationToken", authControllers.verify);

router.post(
  "/verify",
  validateBody(schemas.userEmailSchema),
  authControllers.resendVerifyEmail
);

// signin
router.post("/login", validateBody(schemas.loginSchema), authControllers.login);

router.get("/current", authenticate, authControllers.getCurrent);

router.post("/logout", authenticate, authControllers.logout);

router.patch(
  "/",
  authenticate,
  validateSubscription(schemas.updateSubscriptionSchema),
  authControllers.subscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);

module.exports = router;
