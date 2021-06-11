const express = require("express");

const User = require("../models/User");
const AppError = require("../utils/AppError");

const crypto = require("../utils/crypto");

const sendEmail = require("../utils/email");

const router = express.Router();

function passwordStrengthHandler(val) {
    let percentage = 0;

    if (val.match(/[A-Z]/)) {
        percentage += 25;
    }
    if (val.match(/[0-9]/)) {
        percentage += 15;
    }

    if (val.length > 8) {
        percentage += 40;
    }

    if (val.match(/[-!$%@^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
        percentage += 20;
    }

    return percentage;
}

router.use(async (req, res, next) => {
    const user = await User.findById(req.session.user.id);
    if (!user) {
        return next(
            new AppError("you are not authenticated, please log in", 400)
        );
    }
    next();
});

router.post("/generate-pin", async (req, res, next) => {
    try {
        const { pin } = req.body;

        const user = await User.findById(req.session.user.id);

        if (user.passwords.pin) {
            return next(
                new AppError("your already set a pin for this account", 400)
            );
        }

        if (!pin || pin.trim().length === 0) {
            return next(new AppError("Please enter valid pin", 400));
        }

        user.passwords.pin = pin;

        await user.save();

        req.session.user = user;

        res.json({
            message: "success",
            user,
            loggedIn: true,
        });
    } catch (err) {
        return next(new AppError(err.message, 400));
    }
});

router.post("/verify-pin", async (req, res, next) => {
    try {
        const { password, pin } = req.body;

        const user = await User.findById(req.session.user.id);

        if (user.passwords.pin !== pin) {
            return next(new AppError("Invalid Pin", 401));
        }
        const decryptPassword = crypto.decrypt(password);

        res.status(200).json({
            decryptPassword,
        });
    } catch (err) {
        return next(new AppError(err.message, 401));
    }
});

router.post("/add", async (req, res, next) => {
    try {
        const { title, link, username, password } = req.body;

        const passwordStrength = passwordStrengthHandler(password);

        const user = await User.findById(req.session.user.id);

        const encryptedPassword = crypto.encrypt(password);

        user.passwords.entries.push({
            title,
            link,
            username,
            password: encryptedPassword,
            passwordStrength,
        });

        await user.save();

        req.session.user = user;

        res.status(200).json({
            message: "Sucess",
            loggedIn: true,
            user,
        });
    } catch (err) {
        return next(new AppError(err.message, 400));
    }
});

router.delete("/delete/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(typeof id);

        const user = await User.findById(req.session.user.id);

        const updatedEntries = user.passwords.entries.filter(
            (entry) => entry._id != id
        );

        user.passwords.entries = updatedEntries;

        console.log(user);

        await user.save();

        req.session.user = user;

        res.status(200).json({
            loggedIn: true,
            user,
        });
    } catch (err) {
        return next(new AppError(err.message, 400));
    }
});

router.get("/change-pin", (req, res, next) => {
    try {
        sendEmail({
            email: "arulvalananto@gmail.com",
            subject: "Reset Your Annals Password's Pin",
            user: {
                id: req.session.user.id,
                email: req.session.user.email,
            },
        });
        res.status(200).json({ message: "Please check your email" });
    } catch (err) {
        return next(new AppError(err.message, 400));
    }
});

router.post("/confirm-change-pin/:id", (req, res, next) => {

})

module.exports = router;
