const jwt = require("jsonwebtoken");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const User = require("../models/User.model");

module.exports = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers["x-auth-secret"] &&
    req.headers["x-auth-secret"].startsWith("Bearer")
  ) {
    token = req.headers["x-auth-secret"].split(" ")[1];
  }
  if (!token) return next(new AppError("unsanctioned", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user || !decoded.verified) return next(new AppError("unsanctioned"));

  req.userVerified = true;
  next();
});
