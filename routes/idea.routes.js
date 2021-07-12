const express = require("express");
const Idea = require("../models/Idea.model");

const {
  addIdea,
  updateIdea,
  deleteIdea,
} = require("../controllers/idea.controller");

const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

router.use(isAuthenticated);

router.post("/add", addIdea);

router.patch("/update/:id", updateIdea);

router.delete("/delete/:id", deleteIdea);

module.exports = router;
