const User = require("../models/User.model");
const Idea = require("../models/Idea.model");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.addIdea = catchAsync(async (req, res) => {
  const { title, content } = req.body;

  const user = await User.findById(req.session.userId).populate("ideas");

  const idea = await Idea({ title, content, createdBy: user.id }).save();

  user.ideas.push(idea.id);
  await user.save();

  res.status(201).json(idea);
});

exports.updateIdea = catchAsync(async (req, res) => {
  const { content } = req.body;

  const idea = await Idea.findById(req.params.id);

  idea.content = content;
  await idea.save();

  res.status(200).json(idea);
});

exports.deleteIdea = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const idea = await Idea.deleteOne({ _id: id });
  if (!idea) {
    return next(new AppError("Id not found!", 404));
  }
  const user = await User.findById(req.session.userId).populate("ideas");

  user.ideas.remove(id);
  await user.save();

  res.status(200).json({ deleted: true });
});
