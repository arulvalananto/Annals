const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
const compression = require("compression");

const authRoutes = require("./routes/auth.routes");
const journalRoutes = require("./routes/journal.routes");
const ideaRoutes = require("./routes/idea.routes");
const errorController = require("./controllers/error.controller");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["authorization", "content-type"],
    credentials: true,
  })
);
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Headers", "*");

  next();
});

// app.use("/", (req, res) => {
//   res.status(200).json({ message: "Welcome to Annals" });
// });

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/journals", journalRoutes);
app.use("/api/v1/ideas", ideaRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    message: `Can't find ${req.originalUrl} this route`,
  });
});

app.use(errorController);

module.exports = app;
