const mongoose = require("mongoose");

const ideaSchema = mongoose.Schema(
  {
    entries: [
      {
        title: {
          type: String,
        },
        content: {
          type: String,
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
  }
);

module.exports = mongoose.model("Idea", ideaSchema);
