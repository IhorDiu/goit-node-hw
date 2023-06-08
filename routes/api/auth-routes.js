const express = require("express");

const authControllers = require("../../controllers/users");

const { authenticate, validateSubscription } = require("../../middlewares");

const { validateBody } = require("../../utils");

const { schemas } = require("../../models/user");

const router = express.Router();

// signup
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  authControllers.register
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

module.exports = router;
