const Journal = require("../models/Journal.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getJournals = catchAsync(async (req, res, next) => {
  const journals = await Journal.find({ createdBy: req.userId });

  res.status(200).json({ result: journals.length, journals });
});

exports.addJournal = catchAsync(async (req, res, next) => {
  const { content, location } = req.body;

  const date = new Date(Date.now()).toDateString();

  const journal = await Journal.create({
    date,
    content,
    location,
    createdBy: req.userId,
  });

  res.status(201).json({ journal });
});

exports.updateJournal = catchAsync(async (req, res, next) => {
  const { content } = req.body;

  const journal = await Journal.findById(req.params.id);
  if (!journal) return next(new AppError("Journal not found"));

  journal.content = content;
  await journal.save();

  res.status(200).json({ message: "Journal Updated" });
});
