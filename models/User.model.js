const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const Timeline = require("./Diary.model");
const Password = require("./Password.model");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "User must have a name"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email should not be empty"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      trim: true,
    },
    password: {
      type: String,
      select: false,
      minLength: 8,
    },
    googleId: {
      type: String,
    },
    facebookId: {
      type: String,
    },
    passwords: { type: Password.schema, default: {} },
    diary: [{ type: mongoose.Schema.Types.ObjectId, ref: "Diary" }],
    ideas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ideas" }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tasks" }],
    reminders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reminders" }],
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
