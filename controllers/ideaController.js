const User = require("../models/User");
const Idea = require("../models/Idea");
const AppError = require("../utils/AppError");

const sendResponse = async (sessionUser, res) => {
  const user = await User.findById(sessionUser.id).populate("ideas");

  sessionUser = user;

  res.status(200).json({ loggedIn: true, user });
};

exports.addIdea = async (req, res, next) => {
  const { title, content } = req.body;

  try {
    const idea = await Idea.findById(req.session.user.ideas._id);

    idea.entries.push({ title, content });

    await idea.save();

    sendResponse(req.session.user, res);
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

exports.updateIdea = async (req, res, next) => {};

exports.deleteIdea = async (req, res, next) => {
  try {
    const ideas = await Idea.findById(req.session.user.ideas._id);

    const filteredEntries = ideas.entries.filter(
      (entry) => entry.id !== req.params.id
    );

    ideas.entries = filteredEntries;

    await ideas.save();

    sendResponse(req.session.user, res);
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};
