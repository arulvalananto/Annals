const Todo = require("../models/Todo.model");
const User = require("../models/User.model");

const catchAsync = require("../utils/catchAsync");

exports.addTodo = catchAsync(async (req, res, next) => {
  const { content } = req.body;

  const userId = req.session.user._id;

  const todo = await Todo({
    content,
    createdBy: userId,
  }).save();

  const user = await User.findById(userId);

  user.todos.push(todo);

  await user.save();

  res.status(201).json(todo);
});

exports.updateTodo = (req, res, next) => {
  const todo = await;
};

exports.updateStatus = catchAsync(async (req, res, next) => {
  const { status, id } = req.body;

  const todo = await Todo.findById(id);

  todo.status = status;

  await todo.save();

  console.log(todo);

  // This is end point is not completed.
});

exports.deleteTodo = (req, res, next) => {
  
};
