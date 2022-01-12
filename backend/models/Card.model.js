const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
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
});

module.exports = mongoose.model("Cards", cardSchema);
