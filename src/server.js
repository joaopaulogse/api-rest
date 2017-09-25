const http = require('http');
const { port,env } = require('./config/vars');
const app = require('./config/express');
require("./config/mongodb")
http.createServer(app).listen(port, () => {
  console.log(`Server up, localhost:${port}
Ambiente: ${env}`);
});
module.exports = app;
