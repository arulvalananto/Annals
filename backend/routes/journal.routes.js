const express = require("express");

const {
  addJournal,
  deleteJournal,
  deleteJournals,
  getJournals,
} = require("../controllers/journal.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

const route = express.Router();

route.use(isAuthenticated);

route.get("/get", getJournals);
route.post("/add", addJournal);
route.patch("/update/:id", updateJournal);
route.delete("/delete/:id", deleteJournal);
// route.delete("/delete-all", deleteJournals);

module.exports = route;
