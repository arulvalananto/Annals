const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const User = require("../models/User.model");
const sendToken = require("../utils/jwt");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const sendMail = require("../utils/sendMail");

const _diffMinutes = (time) => {
  var now = moment(new Date());
  var end = moment(time);
  var duration = moment.duration(now.diff(end));
  return duration.minutes();
};

exports.register = catchAsync(async (req, res, next) => {
  const { fullName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({ fullName, email, password: hashedPassword });

  const token = sendToken(user._id);

  sendMail({
    to: email,
    subject: "Account Created Successfully",
    name: fullName,
  });

  res.status(201).json({ token });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password +lastLoginAt");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid Email / Password / Method", 404));
  }

  user.lastLoginAt = Date.now();
  await user.save();

  const token = sendToken(user._id);

  res.status(200).json({ token });
});

exports.getCurrentUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userId).lean();

  res.status(200).json({ user });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email }).select(
    "+resetPasswordCode +resetPasswordCodeSentAt"
  );
  if (!user) return next(new AppError("No User Found", 404));

  let code;
  if (_diffMinutes(user.resetPasswordCodeSentAt) < 10) {
    code = user.resetPasswordCode;
  } else {
    const randomId = uuidv4();
    code = `${randomId}/${user._id}`;

    user.resetPasswordCode = code;
    user.resetPasswordCodeSentAt = Date.now();
    await user.save();
  }

  sendMail({
    to: email,
    Subject: "Forgot Password Request",
    template: "forgotPassword",
    name: user.fullName,
    code,
  });

  res.status(200).json({ message: "Message sent to your email address " });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { code, password } = req.body;

  if (!code) return next(new AppError("Invalid code", 401));
  const userId = code.split("/")[1];

  const user = await User.findById(userId).select(
    "+resetPasswordCode +resetPasswordCodeSentAt"
  );

  if (_diffMinutes(user.resetPasswordCodeSentAt) > 10)
    return next(new AppError("Code timeout", 401));

  if (!user || user.resetPasswordCode !== code)
    return next(new AppError("Invalid code", 404));

  const hashedPassword = await bcrypt.hash(password, 12);
  user.password = hashedPassword;
  user.passwordLastChangedAt = Date.now();
  user.resetPasswordCode = "";
  await user.save();

  res.status(200).json({ message: "Password Changed" });
});

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
