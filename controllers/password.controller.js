const User = require("../models/User.model");
const Logo = require("../models/Logo.model");

const AppError = require("../utils/AppError");
const crypto = require("../utils/crypto");
const sendEmail = require("../utils/email");
const catchAsync = require("../utils/catchAsync");
const passwordStrengthChecker = require("../utils/passwordStrength");

const sendResponse = async (req, res) => {
  const user = await User.findById(req.session.userId);

  res.status(200).json({
    loggedIn: true,
    user,
  });
};

exports.generatePin = catchAsync(async (req, res, next) => {
  const { pin } = req.body;

  if (!pin || pin.trim().length === 0) {
    return next(new AppError("Please enter valid pin", 400));
  }

  const user = await User.findById(req.session.userId);

  user.passwords.pin = pin;

  await user.save();

  res.status(200).json({
    loggedIn: true,
    user,
  });
});

exports.verifyPin = catchAsync(async (req, res, next) => {
  const { password, pin } = req.body;

  const user = await User.findById(req.session.userId);
  console.log(user)

  if (user.passwords.pin !== pin) {
    return next(new AppError("Invalid Pin", 401));
  }
  const decryptPassword = crypto.decrypt(password);

  res.status(200).json({
    decryptPassword,
  });
});

exports.addPassword = catchAsync(async (req, res) => {
  const { title, link, username, password } = req.body;

  const passwordStrength = passwordStrengthChecker(password);

  const encryptedPassword = crypto.encrypt(password);

  const logo = await Logo.findOne({
    avatar: { $regex: title.toLowerCase(), $options: "i" },
  });

  let avatar;
  if (!logo) {
    avatar = "http://localhost:5000/uploads/default.png";
  } else {
    avatar = "http://localhost:5000/" + logo.avatar;
  }

  await User.updateOne(
    { _id: req.session.userId },
    {
      $push: {
        "passwords.entries": {
          title,
          link,
          username,
          password: encryptedPassword,
          passwordStrength,
          avatar,
        },
      },
    }
  );

  sendResponse(req, res);
});

exports.deletePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.session.userId);

  user.passwords.entries.remove(req.params.id);

  await user.save();

  sendResponse(req, res);
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
