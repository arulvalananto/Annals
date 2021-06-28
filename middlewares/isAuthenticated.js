const User = require("../models/User");

const AppError = require("../utils/AppError");

module.exports = async (req, res, next) => {
  const user = await User.findById(req.session.user.id);
  if (!user) {
    return next(new AppError("you are not authenticated, please log in", 400));
  }
  next();
};
