const express = require("express");

const {
  addIdea,
  updateIdea,
  deleteIdea,
} = require("../controllers/ideaController");

const isAuthenticated = require("../middlewares/isAuthenticated");


const router = express.Router();

router.use(isAuthenticated);

router.post("/add", addIdea);

router.patch("/update/:id", updateIdea);

router.delete("/delete/:id", deleteIdea);

module.exports = router;
