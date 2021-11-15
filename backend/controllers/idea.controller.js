const Idea = require("../models/Idea.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { colorName, colors } = require("../data/colors");

exports.getIdeas = catchAsync(async (req, res, next) => {
  const ideas = await Idea.find({ createdBy: req.userId });

  res.status(200).json({ result: ideas.length, ideas });
});

exports.addIdea = catchAsync(async (req, res, next) => {
  const { content, title } = req.body;

  const color = colors[colorName];

  const idea = await Idea.create({
    title,
    content,
    color,
    createdBy: req.userId,
  });

  res.status(201).json({ idea });
});

exports.updateIdea = catchAsync(async (req, res, next) => {
  const { content, title } = req.body;
  const { id } = req.params;

  const idea = await Idea.findById(id);
  if (!idea) return next(new AppError("Idea not found"));

  idea.content = content;
  idea.title = title;
  await idea.save();

  res.status(200).json({ message: "Idea Updated" });
});

exports.deleteIdea = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const idea = await Idea.findById(id);
  if (!idea) return next(new AppError("Idea not found"));

  await Idea.deleteOne({ _id: id });

  res.status(200).json({ message: "Idea Deleted" });
});
