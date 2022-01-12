const express = require("express");

const {
  addPersonal,
  getAllPersonal,
} = require("../controllers/personal.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

router.use(isAuthenticated);

router.get("/", getAllPersonal);
router.post("/create", addPersonal);

module.exports = router;
