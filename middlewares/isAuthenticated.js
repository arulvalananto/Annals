const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const User = require("../models/User.model");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

module.exports = catchAsync(async (req, res, next) => {
  if (!req.session.token) {
    return next(new AppError("unauthorized", 401));
  }

  const decoded = await promisify(jwt.verify)(
    req.session.token,
    process.env.JWT_SECRET
  );

  if (!decoded) {
    return next(new AppError("Invalid Token", 401));
  }

  req.session.userId = decoded.id;
  next();
});
