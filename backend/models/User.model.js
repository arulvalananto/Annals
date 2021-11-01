const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "User must have a name"],
      maxLength: 100,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email Address should not be empty"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      trim: true,
    },
    googleId: {
      type: String,
    },
    facebookId: {
      type: String,
    },
    password: {
      type: String,
      select: false,
      minLength: 8,
    },
    mobile: {
      type: String,
      maxLength: [10, "Mobile Number length should be 10"],
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    accountVerified: { type: Boolean, default: false },
    resetPasswordCode: { type: String, select: false, default: "" },
    resetPasswordCodeFailure: { type: Number, default: 0 },
    passwordLastChangedAt: { type: Date, select: false, default: Date.now() },
    lastLoginAt: { type: Date, select: false, default: Date.now() },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("Users", userSchema);
