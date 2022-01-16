const mongoose = require("mongoose");

const { encrypt } = require("../utils/encrypt-decrypt");

const cardSchema = mongoose.Schema(
  {
    bankName: {
      type: String,
      required: true,
    },
    providerName: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    accountHolderName: {
      type: String,
      required: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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

cardSchema.pre("save", async function (next) {
  if (
    !this.isModified("bankName") &&
    !this.isModified("providerName") &&
    !this.isModified("cardNumber") &&
    !this.isModified("accountHolderName")
  )
    return next();

  // Hash the password with cost of 12
  if (this.isModified("bankName")) this.bankName = encrypt(this.bankName);
  if (this.isModified("providerName"))
    this.providerName = encrypt(this.providerName);
  if (this.isModified("cardNumber")) this.cardNumber = encrypt(this.cardNumber);
  if (this.isModified("accountHolderName"))
    this.accountHolderName = encrypt(this.accountHolderName);

  next();
});

module.exports = mongoose.model("Cards", cardSchema);
