const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "must have a content"],
    },
    status: {
      type: String,
      enum: {
        values: ["todo", "in-progress", "completed"],
        message: "{VALUE} is not valid",
      },
      default: "todo",
    },
    priorityLevel: {
      type: String,
      enum: {
        values: ["critical", "important", "normal"],
        message: "{VALUES} is not valid",
      },
    },
    category: {
      type: String,
      enum: {
        values: [
          "food",
          "entertainment",
          "workout",
          "personal",
          "work",
          "clean",
          "shopping",
          "travel",
          "others",
        ],
        message: "{VALUES} is not valid",
      },
    },
    dueDate: { type: Date },
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

module.exports = mongoose.model("Tasks", taskSchema);
