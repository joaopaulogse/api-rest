const https = require('https');
const http = require('http')
const { port,env } = require('./config/vars');
const app = require('./config/express');
const {readFileSync} = require('fs')
require("./config/mongodb")
  // https.createServer({
  //   key:readFileSync('./localhost-privkey.pem'),
  //   cert:readFileSync('./localhost-cert.pem')
  // },app).listen(port, () => {
  //   console.log(`Server https up, localhost:${port}
  // Ambiente: ${env}`);
  // });
  const server = http.createServer(app);
  server.listen(port, '0.0.0.0',()=>{
    console.log(`Server http up, ${server.address().address}:${port}
    Ambiente: ${env}`);
  })
module.exports = app;
