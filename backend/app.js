const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
const compression = require("compression");

// require("./utils/sendMail");
const authRoutes = require("./routes/auth.routes");
const errorController = require("./controllers/error.controller");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    message: `Can't find ${req.originalUrl} this route`,
  });
});

app.use(errorController);

module.exports = app;
