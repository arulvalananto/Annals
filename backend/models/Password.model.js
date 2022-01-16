const mongoose = require("mongoose");

const { encrypt, decrypt } = require("../utils/encrypt-decrypt");

const passwordSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 256,
      minLength: 2,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
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

passwordSchema.pre("save", async function (next) {
  if (
    !this.isModified("name") &&
    !this.isModified("password") &&
    !this.isModified("username") &&
    !this.isModified("url")
  )
    return next();

  // Hash the password with cost of 12
  if (this.isModified("name")) this.name = encrypt(this.name);
  if (this.isModified("password")) this.password = encrypt(this.password);
  if (this.isModified("username")) this.username = encrypt(this.username);
  if (this.isModified("url")) this.url = encrypt(this.url);

  next();
});

module.exports = mongoose.model("Passwords", passwordSchema);
