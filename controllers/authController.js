const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const AppError = require("../utils/AppError");
const User = require("../models/User");
const Idea = require("../models/Idea");

const signToken = require("../utils/jwt");
const catchAsync = require("../utils/catchAsync");

const sendResponse = (req, next, user) => {
  const token = signToken(user);

  if (!token) {
    return next(
      new AppError("Something wrong with token.. Please try again", 400)
    );
  }

  req.session.token = token;
};

exports.register = catchAsync(async (req, res, next) => {
  const { fullName, email, password } = req.body;

  if (!password) {
    return next(new AppError("Password is Required", 400));
  }

  const formattedPassword = await bcrypt.hash(password, 12);

  const idea = await Idea().save();

  const user = User({
    fullName,
    email,
    password: formattedPassword,
    ideas: idea,
  });
  await user.save();

  user.password = undefined;

  sendResponse(req, next, user._id);

  res.status(201).json({ loggedIn: true, user });
});

exports.getCurrentUser = catchAsync(async (req, res, next) => {
  if (req.session.token) {
    const decoded = await promisify(jwt.verify)(
      req.session.token,
      process.env.JWT_SECRET
    );

    const currentUser = await User.findById(decoded.id).populate("ideas");
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }

    req.session.user = currentUser;

    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

exports.logout = async (req, res) => {
  if (req.session) {
    req.session.destroy();
  }

  res.clearCookie("token");

  res.redirect("http://localhost:3000/signin");
};

exports.loginError = (err, req, res, next) => {
  if (err) {
    return next(new AppError(err, 404));
  }
  next();
};

exports.login = (req, res, next) => {
  sendResponse(req, next, req.user.id);

  res.status(200).json({ loggedIn: true, user: req.user });
};

exports.thirdPartyLogin = (req, res, next) => {
  sendResponse(req, next, req.user.id);

  res.redirect("http://localhost:3000/");
};
