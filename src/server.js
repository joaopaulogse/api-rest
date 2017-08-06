const http = require('http');
const { port } = require('./config/vars');
const app = require('./config/express');

http
    .createServer(app)
    .listen(port, () => {
        console.info(`Server up, localhost:${port}`);
    });
module.exports = app;