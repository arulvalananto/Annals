const moment = require("moment");

const Journal = require("../models/Journal.model");
const User = require("../models/User.model");
const Focus = require("../models/Focus.model");
const AppError = require("../utils/AppError");

exports.getDashboardContent = catchAsync(async (req, res, next) => {
  const today = moment().startOf("day");

  const user = await User.findById(req.userId).select("+loginLogs").lean();
  if (!user) return next(new AppError("No user found", 404));

  const journals = await Journal.find({ createdBy: req.userId }).lean();

  // Tasks should be added here
  const focus = await Focus.findOne({
    date: {
      $gte: today.toDate(),
      $lte: moment(today).endOf("day").toDate(),
    },
  }).lean();

  res.status(200).json({
    days: user.loginLogs.length,
    journals: journals.length,
    focus:
      focus && focus.agenda.length ? focus.agenda[focus.agenda.length - 1] : "",
  });
});
