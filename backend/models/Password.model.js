const mongoose = require("mongoose");

const passwordSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 256,
    minLength: 2,
  },
  username: {
    type: string,
  },
  password: {
    type: string,
    required: true,
  },
  url: {
    type: string,
    required: true,
  },
});

module.exports = mongoose.model("Passwords", passwordSchema);
