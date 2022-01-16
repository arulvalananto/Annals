const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Password = require("../models/password.model");
const CryptoWallet = require("../models/CryptoWallet.model");
const Card = require("../models/Card.model");
const { decrypt } = require("../utils/encrypt-decrypt");

const _creation = async (Model, req) => {
  return await Model.create({
    ...req.body,
    createdBy: req.userId,
  });
};

const _updatable = async (Model, id, body) => {
  await Model.findByIdAndUpdate(id, body);
};

const _deletion = async (Model, req, res, next) => {
  const { id } = req.params;

  const data = await Model.findById(id);
  if (!data) return next(new AppError("Data not found"));

  await Model.deleteOne({ _id: id });

  res.status(200).json({ message: "Data Deleted" });
};

exports.addPersonal = catchAsync(async (req, res, next) => {
  const { category } = req.body;
  let data;

  if (!category) {
    return next(new AppError("Category is not defined", 400));
  }

  switch (category.toLowerCase()) {
    case "password":
      data = await _creation(Password, req);
      break;
    case "cryptowallet":
      data = await _creation(CryptoWallet, req);
      break;
    case "card":
      data = await _creation(Card, req);
      break;
    default:
      return next(new AppError("Invalid category", 400));
  }

  res.status(201).json({ data });
});

exports.getAllPersonal = catchAsync(async (req, res, next) => {
  const passwords = await Password.find({ createdBy: req.userId }).lean();
  const cards = await Card.find({ createdBy: req.userId }).lean();
  const wallets = await CryptoWallet.find({
    createdBy: req.userId,
  }).lean();

  const updatedPasswords = passwords.map((pass) => {
    pass.name = decrypt(pass.name);
    pass.password = decrypt(pass.password);
    pass.username = decrypt(pass.username);
    pass.url = decrypt(pass.url);

    return pass;
  });

  const updatedCards = cards.map((card) => {
    card.bankName = decrypt(card.bankName);
    card.providerName = decrypt(card.providerName);
    card.cardNumber = decrypt(card.cardNumber);
    card.accountHolderName = decrypt(card.accountHolderName);

    return card;
  });

  const updatedWallets = wallets.map((wallet) => {
    wallet.publicAddress = decrypt(wallet.publicAddress);
    if (wallet.privateAddress)
      wallet.privateAddress = decrypt(wallet.privateAddress);
    if (wallet.passPhrase) wallet.passPhrase = decrypt(wallet.passPhrase);

    return wallet;
  });

  res.status(200).json({
    passwords: updatedPasswords,
    cards: updatedCards,
    cryptoWallets: updatedWallets,
    // passwords,
    // cards,
    // wallets,
  });
});

exports.updatePersonal = catchAsync(async (req, res, next) => {
  const { category, id } = req.params;

  if (!category) {
    return next(new AppError("Category is not defined", 400));
  }

  switch (category.toLowerCase()) {
    case "password":
      await _updatable(Password, id, req.body);
      break;
    case "cryptowallet":
      await _updatable(CryptoWallet, id, req.body);
      break;
    case "card":
      await _updatable(Card, id, req.body);
      break;
    default:
      return next(new AppError("Invalid category", 400));
  }

  res.status(200).json({ message: "Data Updated" });
});

exports.deletePersonal = catchAsync(async (req, res, next) => {
  const { category } = req.params;

  if (!category) {
    return next(new AppError("Category is not defined", 400));
  }

  switch (category.toLowerCase()) {
    case "password":
      await _deletion(Password, req, res, next);
      break;
    case "cryptowallet":
      await _deletion(CryptoWallet, req, res, next);
      break;
    case "card":
      await _deletion(Card, req, res, next);
      break;
    default:
      return next(new AppError("Invalid category", 400));
  }
});
