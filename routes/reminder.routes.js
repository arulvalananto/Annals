const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  addReminder,
  getAllReminders,
  deleteReminder,
} = require("../controllers/reminder.controller");

const route = express.Router();

route.use(isAuthenticated);

route.post("/add", addReminder);

route.get("/get", getAllReminders);

route.get("/delete", deleteReminder);

module.exports = route;
