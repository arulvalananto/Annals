const mongoose = require("mongoose");

const focusSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      unique: true,
      required: true,
    },
    agenda: [],
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
  }
);

module.exports = mongoose.model("Focuses", focusSchema);
