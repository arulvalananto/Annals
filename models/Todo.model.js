const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "must have a content"],
    },
    status: {
      type: String,
      enum: {
        values: ["todo", "inprogress", "done"],
        message: "{VALUE} is not valid",
      },
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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

module.exports = mongoose.model("Todos", todoSchema);
