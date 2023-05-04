const mongoose = require('mongoose');

module.exports = mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connect'))
    .catch((err) => console.log('DB Connection Error: ' + err));
