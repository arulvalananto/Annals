const mongoose = require("mongoose");

const passwordSchema = mongoose.Schema(
  {
    pin: {
      type: String,
      default: "",
    },
    entries: [
      {
        title: {
          type: String,
          required: true,
        },
        link: {
          type: String,
        },
        username: {
          type: String,
        },
        password: {
          type: String,
        },
        risk: {
          type: String,
          default: "low",
        },
        passwordStrength: {
          type: String,
        },
        avatar: {
          type: String,
        },
        coverImage: {
          type: String,
        },
        updatedAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
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

module.exports = mongoose.model("Passwords", passwordSchema);
