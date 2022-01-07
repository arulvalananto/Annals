const mongoose = require("mongoose");

const personalSchema = mongoose.Schema({
  passwords: [{ type: mongoose.Schema.Types.ObjectId, ref: "Password" }],
  cryptoWallets: [
    { type: mongoose.Schema.Types.ObjectId, ref: "CryptoWallet" },
  ],
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Personals", personalSchema);
