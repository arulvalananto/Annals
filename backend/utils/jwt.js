const jwt = require("jsonwebtoken");

module.exports = (id, verified = false) => {
  return jwt.sign({ id, verified }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
