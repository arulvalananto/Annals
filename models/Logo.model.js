const mongoose = require("mongoose");

const logoSchema = mongoose.Schema(
  {
    avatar: {
      type: String,
      require: true,
      unique: true,
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

module.exports = mongoose.model("Logos", logoSchema);
