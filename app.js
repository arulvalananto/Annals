const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

const authRoutes = require("./routes/auth.routes");
const diaryRoutes = require("./routes/diary.routes");
const passwordRoutes = require("./routes/password.routes");
const ideaRoutes = require("./routes/idea.routes");
const logoRoutes = require("./routes/logo.routes");

require("./utils/passport");
// require("./utils/cache");

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    key: "token",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 60 * 24,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      mongoOptions: {
        useUnifiedTopology: true,
      },
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// API End-Points

app.use("/api/v1/logos", logoRoutes);

app.use("/", authRoutes);
app.use("/api/v1", diaryRoutes);
app.use("/api/v1/password", passwordRoutes);
app.use("/api/v1/ideas", ideaRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    message: `Can't find ${req.originalUrl} in this route`,
  });
});

app.use((err, req, res, next) => {
  err.status = err.status || "fail";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
});

module.exports = app;
