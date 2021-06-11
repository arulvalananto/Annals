const AppError = require("../utils/AppError");
const User = require("../models/User");

exports.addPage = async (req, res, next) => {
    try {
        const { content, weather, location } = req.body;

        const user = await User.findById(req.session.user.id);

        if (!user) {
            return next(new AppError("No User with this email", 401));
        }
        const date = user.diary.pages.find(
            (el) =>
                new Date(el.writtenAt).toDateString() ==
                new Date(Date.now()).toDateString()
        );
        if (date) {
            return next(
                new AppError(
                    "You wrote a page for today... so you can edit it",
                    400
                )
            );
        }

        user.diary.pages.push({
            content,
        });

        await user.save();

        req.session.user = user;

        res.send({
            message: "Success",
            loggedIn: true,
            user,
        });
    } catch (err) {
        console.log(err.status);
        console.log(err);
        return next(new AppError(err.message, 404));
    }
};

exports.updatePage = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findById(req.session.user.id);

        const page = user.diary.pages.id(id);

        if (
            new Date(page.writtenAt).toDateString("en-IN") !==
            new Date(Date.now()).toDateString("en-IN")
        ) {
            return next(new AppError("you can only update on that day", 400));
        }

        page.content = req.body.content;
        page.writtenAt = new Date();

        await user.save();

        req.session.user = user;

        res.status(200).json({
            loggedIn: true,
            user,
        });
    } catch (err) {
        return next(new AppError(err.message, 400));
    }
};
