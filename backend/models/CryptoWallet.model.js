const mongoose = require("mongoose");

const { encrypt } = require("../utils/encrypt-decrypt");

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
CryptoWalletSchema.pre("save", async function (next) {
  if (
    !this.isModified("publicAddress") &&
    !this.isModified("privateAddress") &&
    !this.isModified("passPhrase")
  )
    return next();

  // Hash the password with cost of 12
  if (this.isModified("publicAddress"))
    this.publicAddress = encrypt(this.publicAddress);
  if (this.isModified("privateAddress"))
    this.privateAddress = encrypt(this.privateAddress);
  if (this.isModified("passPhrase")) this.passPhrase = encrypt(this.passPhrase);

  next();
});

module.exports = mongoose.model("CryptoWallets", CryptoWalletSchema);
