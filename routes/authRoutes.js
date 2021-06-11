const express = require("express");
const passport = require("passport");

const AppError = require("../utils/AppError");
const authController = require("../controllers/authController");
const signToken = require("../utils/jwt");

const router = express.Router();

router.post("/api/v1/register", authController.register);

router.post(
    "/api/v1/login",
    passport.authenticate("local"),
    (err, req, res, next) => {
        if (err) {
            return next(new AppError(err, 404));
        }
        next();
    },
    (req, res, next) => {
        const token = signToken(req.user.id);
        req.session.token = token;

        res.status(200).json({
            message: "Success",
            loggedIn: true,
        });
    }
);

router.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/auth/google",
    }),
    (req, res) => {
        const token = signToken(req.user.id);
        req.session.token = token;

        res.redirect("http://localhost:3000/");
    }
);

router.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
        scope: ["user_friends", "email"],
    })
);

router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/auth/facebook" }),
    function (req, res) {
        const token = signToken(req.user.id);
        req.session.token = token;

        res.redirect("http://localhost:3000/");
    }
);

router.get("/api/v1/current-user", authController.getCurrentUser);

router.get("/api/v1/logout", authController.logout);

module.exports = router;
