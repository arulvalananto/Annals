require('dotenv').config({ path: './config/.env' });
require('./db');

process.on('uncaughtException', (err) => {
    console.log(err.name);
    console.log(err.message);
    console.log(err.stack);
});

const app = require('./app');

const port = process.env.PORT || 5001;

app.listen(port, () => console.log('Server running at', port));
