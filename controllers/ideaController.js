const User = require("../models/User");
const Idea = require("../models/Idea");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const sendResponse = async (sessionUser, res) => {
  const user = await User.findById(sessionUser.id).populate("ideas");

  sessionUser = user;

  res.status(200).json({ loggedIn: true, user });
};

exports.addIdea = catchAsync(async (req, res) => {
  const { title, content } = req.body;

  await Idea.updateOne(
    { _id: req.session.user.ideas._id },
    {
      $push: {
        entries: { title, content },
      },
    }
  );

  sendResponse(req.session.user, res);
});

exports.updateIdea = catchAsync(async (req, res) => {
  const { content } = req.body;

  await Idea.updateOne(
    {
      _id: req.session.user.ideas._id,
      entries: { $elemMatch: { _id: req.params.id } },
    },
    {
      $set: { "entries.$.content": content },
    }
  );

  sendResponse(req.session.user, res);
});

exports.deleteIdea = catchAsync(async (req, res, next) => {
  const idea = await Idea.findById(req.session.user.ideas._id);

  if (!idea) {
    return next(new AppError("Id not found!", 404));
  }
  idea.entries.remove(req.params.id);

  await idea.save();

  sendResponse(req.session.user, res);
});
