const mongoose = require("mongoose");

const ideaSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Idea must have a title"],
      trim: true,
    },
    content: {
      type: String,
      trim: true,
      required: [true, "Content should be empty"],
    },
    color: { type: String },
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

module.exports = mongoose.model("Ideas", ideaSchema);
