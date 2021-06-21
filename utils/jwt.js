const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
