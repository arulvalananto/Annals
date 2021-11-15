const express = require("express");

const {
  getIdeas,
  addIdea,
  updateIdea,
  deleteIdea,
  deleteIdeas,
} = require("../controllers/idea.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

const route = express.Router();

route.use(isAuthenticated);

route.get("/get", getIdeas);
route.post("/add", addIdea);
route.patch("/update/:id", updateIdea);
route.delete("/delete/:id", deleteIdea);

module.exports = route;
