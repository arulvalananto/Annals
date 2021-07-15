const chalk = require("chalk");
if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: ".env" });
}

// process.on("uncaughtException", (err) => {
//   console.log(chalk.bold.red("UNCAUGHT EXCEPTION"));
//   console.log(err.name);
//   console.log(chalk.red(err.message));
//   console.log(err.stack);
// });

const app = require("./app");
require("./mongoose");

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Listening on Port:", port);
});
