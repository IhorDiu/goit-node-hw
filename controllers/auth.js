const { User } = require("../models/users");

const { ctrlWrapper } = require("../../decorators");
const { HttpError } = require("../../helpers");

const register = async (req, res) => {};

module.exports = {
  register: ctrlWrapper(register),
};
