const Diary = require("../models/Diary.model");
const User = require("../models/User.model");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.addPage = catchAsync(async (req, res, next) => {
  const { content, weather, location } = req.body;

  const user = await User.findById(req.session.userId).populate("diary");

  if (!user) {
    return next(new AppError("No User with this email", 401));
  }

  const date = user.diary.find(
    (page) =>
      new Date(page.createdAt).toDateString() ===
      new Date(Date.now()).toDateString()
  );
  if (date) {
    return next(
      new AppError("You have already written a journal for today", 400)
    );
  }

  const page = await Diary({ content, createdBy: user.id }).save();

  user.diary.push(page.id);
  await user.save();

  res.status(200).json(page);
});

exports.updatePage = catchAsync(async (req, res, next) => {
  const page = await Diary.findById(req.params.id);

  if (
    new Date(page.createdAt).toDateString("en-IN") !==
    new Date(Date.now()).toDateString("en-IN")
  ) {
    return next(new AppError("you can only update on that day", 400));
  }

  page.content = req.body.content;

  await page.save();

  res.status(200).json(page);
});
