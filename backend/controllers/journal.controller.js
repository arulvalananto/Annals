const Journal = require("../models/Journal.model");
const catchAsync = require("../utils/catchAsync");

exports.getJournals = catchAsync(async (req, res, next) => {
  const journals = await Journal.find({ createdBy: req.userId });

  res.status(200).json({ result: journals.length, journals });
});

exports.addJournal = catchAsync(async (req, res, next) => {
  const { content, location } = req.body;

  var date = new Date(Date.now()).toDateString();

  const journal = await Journal.create({
    date,
    content,
    location,
    createdBy: req.userId,
  });

  res.status(201).json({ journal });
});

exports.editJournal = catchAsync(async (req, res, next) => {});

exports.deleteJournal = catchAsync(async (req, res, next) => {
  await Journal.deleteOne({ _id: req.params.id });

  res.json(200).json({ message: "Journal Deleted" });
});

exports.deleteJournals = (req, res, next) => {};
