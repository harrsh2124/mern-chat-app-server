const dbConn = require('./config/dbConn');
const router = require('./routes/router');
const { PORT } = require('./utils/globals');

const app = require('express')();
const server = require('http').createServer(app);

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

dbConn().then(() => {
    app.get('/', (req, res) => {
        return res.status(200).json({
            message: 'Hello World!'
        });
    });

    app.use(router);
});
