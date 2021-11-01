const express = require("express");

const {
  register,
  login,
  forgotPassword,
  getCurrentUser,
  changePassword,
} = require("../controllers/auth.controller");

const isAuthenticated = require("../middlewares/isAuthenticated");

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/forgot-password", forgotPassword);

route.use(isAuthenticated);

route.get("/current-user", getCurrentUser);
route.patch("/change-password", changePassword);

module.exports = route;
