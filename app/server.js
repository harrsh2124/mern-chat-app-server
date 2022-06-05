const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { PORT } = require('./config/globals');
const socketInit = require('./socket/socketInit');

const app = express();
const server = require('http').createServer(app);

app.use(cors());
app.use(express.json());

// !Always listen to the http server.
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});

socketInit(server);
