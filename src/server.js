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
  http.Server(app).listen(port, ()=>{
    console.log(`Server http up, localhost:${port}
    Ambiente: ${env}`);
  })
module.exports = app;
