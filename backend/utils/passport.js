const passport = require("passport");
let GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User.model");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .lean()
    .then((user) => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      const oldUser = await User.findOne({
        email: profile._json.email,
      });

      if (oldUser) {
        oldUser.googleId = profile.id;
        await oldUser.save();
        return done(null, oldUser);
      }

      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) return done(null, existingUser);

      const user = await User.create({
        googleId: profile.id,
        email: profile._json.email,
        fullName: profile.displayName,
      });

      done(null, user);
    }
  )
);
