const express = require("express");

const { validateBody } = require("../../decorators");

const { schemas } = require("../../models/users");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema));

module.exports = router;
