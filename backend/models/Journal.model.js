const mongoose = require("mongoose");

const journalSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      unique: true,
      required: [true, "Journal must have a date"],
    },
    content: {
      type: String,
      trim: true,
      required: [true, "Content should be empty"],
    },
    climate: { type: String },
    location: { lat: Number, lng: Number },
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

module.exports = mongoose.model("Journals", journalSchema);
