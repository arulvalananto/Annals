const mongoose = require("mongoose");

const CryptoWalletSchema = mongoose.Schema({
  publicAddress: {
    type: String,
  },
  privateAddress: {
    type: String,
  },
  passPhrase: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("CryptoWallets", CryptoWalletSchema);
