const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Password = require("../models/password.model");
const CryptoWallet = require("../models/CryptoWallet.model");
const Card = require("../models/Card.model");

const creation = async (Model, req) => {
  return await Model.create({
    ...req.body,
    createdBy: req.userId,
  });
};

exports.addPersonal = catchAsync(async (req, res, next) => {
  let data;

  if (!req.body.category) {
    return next(new AppError("Category is not defined", 400));
  }

  switch (req.body.category.toLowerCase()) {
    case "password":
      data = await creation(Password, req);
      break;
    case "cryptowallet":
      data = await creation(CryptoWallet, req);
      break;
    case "card":
      data = await creation(Card, req);
      break;
    default:
      return next(new AppError("Invalid category", 400));
  }

  res.status(201).json({ data });
});

exports.getAllPersonal = catchAsync(async (req, res, next) => {
  const passwords = await Password.find({ createdBy: req.userId }).lean();
  const cards = await Card.find({ createdBy: req.userId }).lean();
  const cryptoWallets = await CryptoWallet.find({
    createdBy: req.userId,
  }).lean();

  res.status(200).json({ passwords, cards, cryptoWallets });
});

exports.updatePersonal = catchAsync(async (req, res, next) => {});

exports.deletePersonal = catchAsync(async (req, res, next) => {});
