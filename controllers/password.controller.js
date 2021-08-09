const bcrypt = require("bcryptjs");

const User = require("../models/User.model");
const Logo = require("../models/Logo.model");

const AppError = require("../utils/AppError");
const crypto = require("../utils/crypto");
const sendEmail = require("../utils/email");
const catchAsync = require("../utils/catchAsync");
const passwordStrengthChecker = require("../utils/passwordStrength");

exports.generatePin = catchAsync(async (req, res, next) => {
  const { pin } = req.body;

  if (!pin || pin.trim().length === 0) {
    return next(new AppError("Please enter valid pin", 400));
  }

  const user = await User.findById(req.session.userId);

  const hashPin = await bcrypt.hash(pin, 12);

  user.passwords.pin = hashPin;
  await user.save();

  res.status(200).json({ pin: hashPin });
});

exports.verifyPin = catchAsync(async (req, res, next) => {
  const { password, pin } = req.body;

  const user = await User.findById(req.session.userId);

  if (!(await bcrypt.compare(pin, user.passwords.pin))) {
    return next(new AppError("Invalid Pin", 401));
  }

  const decryptPassword = crypto.decrypt(password);

  res.status(200).json({
    decryptPassword,
  });
});

exports.addPassword = catchAsync(async (req, res) => {
  const { title, link, username, password } = req.body;

  const changedTitle = title.split(" ").join("");

  const passwordStrength = passwordStrengthChecker(password);

  const encryptedPassword = await crypto.encrypt(password);

  const logo = await Logo.findOne({
    avatar: { $regex: changedTitle, $options: "i" },
  });

  let avatar = "";
  let coverImage = "";

  if (logo) {
    avatar = "http://localhost:5000/" + logo.avatar;
    coverImage = "http://localhost:5000/" + logo.cover;
  }

  const user = await User.findById(req.session.userId);

  user.passwords.entries.push({
    title,
    link,
    username,
    password: encryptedPassword,
    passwordStrength,
    avatar,
    coverImage,
  });
  await user.save();

  res.status(201).json(user.passwords.entries);
});

exports.deletePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.session.userId);

  user.passwords.entries.remove(req.params.id);

  await user.save();

  res.status(200).json({ deleted: true });
});

exports.changePin = (req, res, next) => {
  try {
    sendEmail({
      email: "arulvalananto@gmail.com",
      subject: "Reset Your Annals Password's Pin",
      user: {
        id: req.session.user.id,
        email: req.session.user.email,
      },
    });
    res.status(200).json({ message: "Please check your email" });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

exports.confirmChangePin = async (req, res, next) => {};
