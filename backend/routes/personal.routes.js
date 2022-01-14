const express = require("express");

const {
  addPersonal,
  getAllPersonal,
  deletePersonal,
  updatePersonal,
} = require("../controllers/personal.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

router.use(isAuthenticated);

router.get("/", getAllPersonal);
router.post("/create", addPersonal);
router.patch("/:id", updatePersonal);
router.delete("/:id/:category", deletePersonal);

module.exports = router;
