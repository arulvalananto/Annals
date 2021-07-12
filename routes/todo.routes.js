const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  addTodo,
  updateTodo,
  updateStatus,
  deleteTodo,
} = require("../controllers/todo.controller");

const route = express.Router();

route.use(isAuthenticated);

route.post("/add", addTodo);
route.patch("/update/:id", updateTodo);
route.patch("/update-status/:id", updateStatus);
route.delete("delete", deleteTodo);

module.exports = route;
