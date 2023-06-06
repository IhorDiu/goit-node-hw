const { User } = require("../../models/user");

const subscription = async (req, res) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

  res.json(result);
};

module.exports = subscription;
