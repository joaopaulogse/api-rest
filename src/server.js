const https = require("https");
const http = require("http");
const { port, env, port_https } = require("./config/vars");
const app = require("./config/express");
const { readFileSync } = require("fs");
require("./config/mongodb");
/* create keys
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout localhost-privkey.pem -out localhost-cert.pem
*/

// server https
const server_https = https.createServer({
  key:readFileSync("./localhost-privkey.pem"),
  cert:readFileSync("./localhost-cert.pem")
},app).listen(port_https, "0.0.0.0",() => {
  console.log(`Server https up, ${server_https.address().address}:${server_https.address().port}
                Family:${server_https.address().family}
                Ambiente: ${env}`);

// server http
});
const server = http.createServer(app);
server.listen(port, "0.0.0.0", () => {
    console.log(`Server http up, ${server.address().address}:${server.address().port}
                Family:${server.address().family}
                Ambiente: ${env}`);
});
module.exports = server;
