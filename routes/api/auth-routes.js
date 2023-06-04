const express = require("express");

const authControllers = require("../../controllers/auth");

const { validateBody } = require("../../utils");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  authControllers.register
);

router.post("/login", validateBody(schemas.loginSchema), authControllers.login);

module.exports = router;
