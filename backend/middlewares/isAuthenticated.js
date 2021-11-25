const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User.model");

module.exports = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("unauthorized", 401));
  }
  console.log(token);
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  if (!decoded) return next(new AppError("Token not found", 401));

  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError("No User Found"));

  req.userId = decoded.id;

  next();
});
