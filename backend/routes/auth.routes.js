const express = require("express");

const {
  register,
  login,
  forgotPassword,
  getCurrentUser,
  changePassword,
  resetPassword,
  checkMasterPassword,
  generateMasterPassword,
} = require("../controllers/auth.controller");

const isAuthenticated = require("../middlewares/isAuthenticated");

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/forgot-password", forgotPassword);
route.patch("/reset-password", resetPassword);

route.use(isAuthenticated);

route.get("/current-user", getCurrentUser);
route.patch("/change-password", changePassword);

route.post("/check-master-password", checkMasterPassword);
route.post("/generate-master-password", generateMasterPassword);

module.exports = route;
