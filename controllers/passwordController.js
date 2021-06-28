const User = require("../models/User");
const Logo = require("../models/Logo");

const AppError = require("../utils/AppError");
const crypto = require("../utils/crypto");
const sendEmail = require("../utils/email");
const passwordStrengthChecker = require("../utils/passwordStrength");

const sendResponse = async (sessionUser, user, res) => {
  sessionUser = user;

  res.status(200).json({
    loggedIn: true,
    user,
  });
};

exports.generatePin = async (req, res, next) => {
  try {
    const { pin } = req.body;

    const user = await User.findById(req.session.user.id);

    if (user.passwords.pin) {
      return next(new AppError("your already set a pin for this account", 400));
    }

    if (!pin || pin.trim().length === 0) {
      return next(new AppError("Please enter valid pin", 400));
    }

    user.passwords.pin = pin;

    await user.save();

    sendResponse(req.session.user, user, res);
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

exports.verifyPin = async (req, res, next) => {
  try {
    const { password, pin } = req.body;

    const user = await User.findById(req.session.user.id);

    if (user.passwords.pin !== pin) {
      return next(new AppError("Invalid Pin", 401));
    }
    const decryptPassword = crypto.decrypt(password);

    res.status(200).json({
      decryptPassword,
    });
  } catch (err) {
    return next(new AppError(err.message, 401));
  }
};
exports.addPassword = async (req, res, next) => {
  try {
    const { title, link, username, password } = req.body;

    const passwordStrength = passwordStrengthChecker(password);

    const user = await User.findById(req.session.user.id);

    const encryptedPassword = crypto.encrypt(password);

    const logo = await Logo.findOne({
      avatar: { $regex: title.toLowerCase(), $options: "i" },
    });

    user.passwords.entries.push({
      title,
      link,
      username,
      password: encryptedPassword,
      passwordStrength,
      avatar: "http://localhost:5000/" + logo.avatar,
    });

    await user.save();

    sendResponse(req.session.user, user, res);
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

exports.deletePassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(typeof id);

    const user = await User.findById(req.session.user.id);

    const updatedEntries = user.passwords.entries.filter(
      (entry) => entry._id != id
    );

    user.passwords.entries = updatedEntries;

    await user.save();

    sendResponse(req.session.user, user, res);
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

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
