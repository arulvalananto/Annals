const moment = require("moment");

const Focus = require("../models/Focus.model");

exports.fetchFocus = catchAsync(async (req, res) => {
  const focuses = await Focus.find({ createdBy: req.userId });

  res.status(200).json({ focuses });
});

exports.createFocus = catchAsync(async (req, res) => {
  const { agendum } = req.body;
  const today = moment().startOf("day");

  const focus = await Focus.findOne({
    date: {
      $gte: today.toDate(),
      $lte: moment(today).endOf("day").toDate(),
    },
  });

  if (!focus) {
    await Focus.create({
      date: today.toDate(),
      agenda: [agendum],
      createdBy: req.userId,
    });
  } else {
    if (!focus.agenda.find((agen) => agen === agendum)) {
      focus.agenda.push(agendum);
      await focus.save();
    } else {
      return res.status(200).json({ message: "already added" });
    }
  }

  res.status(200).json({ message: "Focus added/created" });
});
