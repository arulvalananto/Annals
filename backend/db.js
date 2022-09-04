const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) return console.log('DB Not Connected');
    console.log('DB Connected');
});
