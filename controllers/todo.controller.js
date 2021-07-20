const Todo = require("../models/Todo.model");
const User = require("../models/User.model");

const catchAsync = require("../utils/catchAsync");

exports.addTodo = catchAsync(async (req, res, next) => {
  const { content } = req.body;

  const todo = await Todo({
    content,
    createdBy: req.session.userId,
  }).save();

  const user = await User.findById(req.session.userId);
  user.todos.push(todo._id);
  await user.save();

  res.status(201).json(todo);
});

exports.updateTodo = (req, res, next) => {
  const todo = await;
};

exports.updateStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  const todo = await Todo.findById(req.params.id);

  todo.status = status;

  await todo.save();

  console.log(todo);

  // This is end point is not completed.
});

exports.deleteTodo = (req, res, next) => {};
