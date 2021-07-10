const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");

const {
  generatePin,
  verifyPin,
  addPassword,
  deletePassword,
  changePin,
  confirmChangePin,
} = require("../controllers/password.controller");

const router = express.Router();

router.use(isAuthenticated);

router.post("/generate-pin", generatePin);

router.post("/verify-pin", verifyPin);

router.post("/add", addPassword);

router.delete("/delete/:id", deletePassword);

router.get("/change-pin", changePin);

router.post("/confirm-change-pin/:id", confirmChangePin);

module.exports = router;
