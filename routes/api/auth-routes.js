const express = require("express");

const authControllers = require("../../controllers/auth");

const {authenticate} = require("../../middlewares");

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

router.post("/logout", authenticate, authControllers.logout)


module.exports = router;
