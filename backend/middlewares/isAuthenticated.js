const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

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

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  if (!decoded) return next(new AppError("Token not found", 401));

  req.userId = decoded.id;

  next();
});
