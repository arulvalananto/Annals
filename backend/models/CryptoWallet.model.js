const mongoose = require("mongoose");

const CryptoWalletSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    publicAddress: {
      type: String,
      trim: true,
      required: true,
    },
    privateAddress: {
      type: String,
      trim: true,
    },
    passPhrase: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("CryptoWallets", CryptoWalletSchema);
