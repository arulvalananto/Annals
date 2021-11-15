const express = require("express");

const {
  getJournals,
  addJournal,
  updateJournal,
} = require("../controllers/journal.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

const route = express.Router();

route.use(isAuthenticated);

route.get("/get", getJournals);
route.post("/add", addJournal);
route.patch("/update/:id", updateJournal);

module.exports = route;
