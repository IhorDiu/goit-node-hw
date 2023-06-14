const { ctrlWrapper } = require("../../utils");

const register = require("./register");
const verify = require("./verify");
const resendVerifyEmail = require("./resendVerifyEmail");

const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const subscription = require("./subscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
  register: ctrlWrapper(register),
  verify: ctrlWrapper(verify),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  subscription: ctrlWrapper(subscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
