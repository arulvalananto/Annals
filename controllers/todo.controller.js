const catchAsync = require("../utils/catchAsync");

exports.addTodo = catchAsync(async (req, res, next) => {
  const { content, status, userId } = req.body;

  const todo = await Todo({
    content,
    status,
    createdBy: userId,
  }).save();

  const user = await User.findById(userId).lean();

  user.todos.push(todo);

  await user.save();

  res.status(201).json(todo);
});

exports.updateTodo = (req, res, next) => {
  const todo = await;
};

exports.updateStatus = (req, res, next) => {};

exports.deleteTodo = (req, res, next) => {};
