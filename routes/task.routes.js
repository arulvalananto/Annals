const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  addTask,
  updateTask,
  updateStatus,
  deleteTask,
} = require("../controllers/task.controller");

const route = express.Router();

route.use(isAuthenticated);

route.post("/add", addTask);
route.patch("/update/:id", updateTask);
route.patch("/update-status/:id", updateStatus);
route.delete("/delete/:id", deleteTask);

module.exports = route;
