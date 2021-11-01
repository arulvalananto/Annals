const bcrypt = require("bcryptjs");

const User = require("../models/User.model");
const sendToken = require("../utils/jwt");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const sendMail = require("../utils/sendMail");

exports.register = catchAsync(async (req, res, next) => {
  const { fullName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({ fullName, email, password: hashedPassword });

  const token = sendToken(user._id);

  // sendMail({
  //   to: email,
  //   subject: "Account Created Successfully",
  //   name: fullName,
  // });

  res.status(201).json({ token });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password +lastLoginAt");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid Email/Password/Method", 404));
  }

  user.lastLoginAt = Date.now();
  await user.save();

  const token = sendToken(user._id);

  res.status(200).json({ token });
});

exports.forgotPassword = (req, res, next) => {};

exports.resetPassword = (req, res, next) => {};

exports.changePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userId).select(
    "+password +passwordLastChangedAt"
  );
  if (!user) return next(new AppError("No User Found"));

  const { password, newPassword } = req.body;
  if (!(await user.correctPassword(password, user.password))) {
    return next(
      new AppError("Incorrect Password..Please Check your password", 404)
    );
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  user.password = hashedPassword;
  user.passwordLastChangedAt = Date.now();
  await user.save();

  res.status(200).json({ message: "Password Changed" });
});

exports.getCurrentUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userId).lean();

  res.status(200).json({ user });
});
