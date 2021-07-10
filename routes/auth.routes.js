const express = require("express");
const passport = require("passport");

const {
  getCurrentUser,
  logout,
  register,
  login,
  thirdPartyLogin,
  loginError,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/api/v1/register", register);

router.post("/api/v1/login", passport.authenticate("local"), loginError, login);

router.get("/api/v1/current-user", getCurrentUser);

router.get("/api/v1/logout", logout);

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
  thirdPartyLogin
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
  thirdPartyLogin
);

module.exports = router;
