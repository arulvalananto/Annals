const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const User = require("../models/User");

module.exports = async (req, res, next) => {
  const decoded = await promisify(jwt.verify)(
    req.session.token,
    process.env.JWT_SECRET
  );
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("You are not authenticated...Please log in", 401));
  }
  next();
};
