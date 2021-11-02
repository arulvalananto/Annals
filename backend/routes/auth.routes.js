const express = require("express");

const {
  register,
  login,
  forgotPassword,
  getCurrentUser,
  changePassword,
  resetPassword,
} = require("../controllers/auth.controller");

const isAuthenticated = require("../middlewares/isAuthenticated");

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/forgot-password", forgotPassword);
route.patch("/reset-password", resetPassword);

route.get("/current-user", isAuthenticated, getCurrentUser);
route.patch("/change-password", isAuthenticated, changePassword);

module.exports = route;
