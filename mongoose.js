const chalk = require("chalk")
const mongoose = require("mongoose")

module.exports = mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(chalk.bold.green("DB CONNECTED"))
})