const mongoose = require("mongoose");
const validator = require("validator");

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "must have a name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "must have a email address"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "must have a password"],
        minLength: [8, "must have a length above 8 characters"],
        select: false
    }
}, {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  })

module.exports = mongoose.model("Admins", adminSchema);