const express = require("express");

const {
  addPersonal,
  getAllPersonal,
  deletePersonal,
  updatePersonal,
} = require("../controllers/personal.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");
const isVerified = require("../middlewares/isVerified");

const router = express.Router();

router.use(isAuthenticated);
router.use(isVerified);

router.get("/", getAllPersonal);
router.post("/create", addPersonal);
router.patch("/:id/:category", updatePersonal);
router.delete("/:id/:category", deletePersonal);

module.exports = router;
