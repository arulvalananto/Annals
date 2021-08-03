const Task = require("../models/Task.model");
const User = require("../models/User.model");

const catchAsync = require("../utils/catchAsync");

exports.addTask = catchAsync(async (req, res, next) => {
  const { title, priorityLevel, category, dueDate } = req.body;
  console.log(title);
  const task = await Task({
    title,
    priorityLevel,
    category,
    dueDate,
    createdBy: req.session.userId,
  }).save();

  const user = await User.findById(req.session.userId);
  user.tasks.push(task._id);
  await user.save();

  res.status(201).json(task);
});

exports.updateTask = (req, res, next) => {
  const task = await;
};

exports.updateStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  const task = await Task.findById(req.params.id);

  task.status = status;

  await task.save();

  console.log(task);

  // This is end point is not completed.
});

exports.deleteTask = (req, res, next) => {};
