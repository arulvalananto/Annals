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
      trim: true,
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
    masterPassword: { type: String, default: "", select: false },
    hasMasterPassword: { type: Boolean, default: false },
    accountVerified: { type: Boolean, default: false },
    resetPasswordCode: { type: String, select: false, default: "" },
    resetPasswordCodeSentAt: { type: Date, select: false },
    resetPasswordCodeFailure: { type: Number, default: 0, select: false },
    passwordLastChangedAt: { type: Date, select: false, default: Date.now() },
    lastLoginAt: { type: Date, select: false, default: Date.now() },
    loginLogs: {
      type: [
        {
          date: {
            type: Date,
            unique: true,
            required: true,
          },
        },
      ],
      select: false,
    },
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
