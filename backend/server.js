require('dotenv').config({ path: '.env' });
require('./db');

const app = require('./app');

const port = process.env.PORT || 5001;

app.listen(port, () => console.log('Server running at', port));
