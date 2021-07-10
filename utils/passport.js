const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const User = require("../models/User.model");
const Idea = require("../models/Idea.model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      const user = await User.findOne({ email })
        .select("+password")
        .populate("ideas");

      if (!user) {
        return done("No user with this email", false);
      }

      if (!user.password) {
        return done("Try to login with google", false);
      }

      if (await user.correctPassword(password, user.password)) {
        user.password = undefined;
        return done(null, user);
      } else {
        return done("Incorrect password", false);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      //cloud.google.com -> create new project -> enable google+ api -> go to credential page (after enable oauth consent screen) ->
      // create credentials with url(current address like http://localhost:5000) on url input and set redirect url= http://localhost:5000/auth/google/callback ->
      // click ok -> you will get two code, one client secret and another client id
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const oldUser = await User.findOne({
        email: profile._json.email,
      }).select("+password");

      if (oldUser) {
        oldUser.googleId = profile.id;
        await oldUser.save();
        oldUser.password = undefined;
        return done(null, oldUser);
      }

      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }

      const idea = await Idea().save();

      const user = await new User({
        googleId: profile.id,
        email: profile._json.email,
        fullName: profile.displayName,
        ideas: idea,
      }).save();
      done(null, user);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:5000/auth/facebook/callback",
      profileFields: ["id", "displayName", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      const existingUser = await User.findOne({ facebookId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }

      const idea = await Idea().save();

      const user = await new User({
        facebookId: profile.id,
        email: profile.emails[0].value,
        fullName: profile.displayName,
        ideas: idea,
      })
        .populate("ideas")
        .save();
      done(null, user);
    }
  )
);
