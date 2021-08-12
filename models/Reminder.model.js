const mongoose = require("mongoose");

const reminderSchema = mongoose.Schema({
  date: {
    type: Date,
  },
  events: [
    {
      content: {
        type: String,
        required: [true, "must have a content"],
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("Reminders", reminderSchema);
