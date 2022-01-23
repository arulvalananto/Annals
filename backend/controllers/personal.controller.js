const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Password = require("../models/password.model");
const CryptoWallet = require("../models/CryptoWallet.model");
const Card = require("../models/Card.model");
const { decrypt, encrypt } = require("../utils/encrypt-decrypt");

const _creation = async (Model, req) => {
  return await Model.create({
    ...req.body,
    createdBy: req.userId,
  });
};

const _updatable = async (Model, id, req, res, next, body) => {
  const isValidUser = await Model.findOne({ _id: id, createdBy: req.userId });
  if (!isValidUser) return next(new AppError("No data found", 401));

  await Model.findByIdAndUpdate(id, body);

  res.status(200).json({ message: "Data Updated" });
};

const _deletion = async (Model, req, res, next) => {
  const { id } = req.params;

  const data = await Model.findOne({ _id: id, createdBy: req.userId });
  if (!data) return next(new AppError("No data found"));

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
  const passwordData = await Password.find({ createdBy: req.userId }).lean();
  const cardData = await Card.find({ createdBy: req.userId }).lean();
  const walletData = await CryptoWallet.find({
    createdBy: req.userId,
  }).lean();

  const passwords = passwordData.map((pass) => {
    pass.name = decrypt(pass.name);
    pass.password = decrypt(pass.password);
    if (pass.username) pass.username = decrypt(pass.username);
    pass.url = decrypt(pass.url);

    return pass;
  });

  const cards = cardData.map((card) => {
    card.bankName = decrypt(card.bankName);
    card.providerName = decrypt(card.providerName);
    card.cardNumber = decrypt(card.cardNumber);
    card.accountHolderName = decrypt(card.accountHolderName);

    return card;
  });

  const cryptoWallets = walletData.map((wallet) => {
    wallet.publicAddress = decrypt(wallet.publicAddress);
    if (wallet.privateAddress)
      wallet.privateAddress = decrypt(wallet.privateAddress);
    if (wallet.passPhrase) wallet.passPhrase = decrypt(wallet.passPhrase);

    return wallet;
  });

  res.status(200).json({
    passwords,
    cards,
    cryptoWallets,
  });
});

exports.updatePersonal = catchAsync(async (req, res, next) => {
  const { category, id } = req.params;

  if (!category) {
    return next(new AppError("Category is not defined", 400));
  }

  switch (category.toLowerCase()) {
    case "password":
      const { password, name, username, url } = req.body;

      await _updatable(Password, id, req, res, next, {
        ...req.body,
        password: password && encrypt(password),
        name: name && encrypt(name),
        username: username && encrypt(username),
        url: url && encrypt(url),
      });
      break;
    case "cryptowallet":
      const { privateAddress, publicAddress, passPhrase } = req.body;

      await _updatable(CryptoWallet, id, req, res, next, {
        ...req.body,
        privateAddress: privateAddress && encrypt(privateAddress),
        publicAddress: publicAddress && encrypt(publicAddress),
        passPhrase: passPhrase && encrypt(passPhrase),
      });
      break;
    case "card":
      const { bankName, providerName, accountHolderName, cardNumber } =
        req.body;

      await _updatable(Card, id, req, res, next, {
        ...req.body,
        bankName: bankName && encrypt(bankName),
        providerName: providerName && encrypt(providerName),
        accountHolderName: accountHolderName && encrypt(accountHolderName),
        cardNumber: cardNumber && encrypt(cardNumber),
      });
      break;
    default:
      return next(new AppError("Invalid category", 400));
  }
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
