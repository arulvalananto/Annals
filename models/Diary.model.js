const mongoose = require("mongoose");

const diarySchema = mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
      required: [true, "content should not be empty!"],
    },
    climate: {
      type: String,
    },
    location: {
      lat: Number,
      lng: Number,
    },
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

module.exports = mongoose.model("Diary", diarySchema);
