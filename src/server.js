const https = require("https");
const http = require("http");
const { port, env, port_https } = require("./config/vars");
const app = require("./config/express");
// const http2 = require("http2");
const { readFileSync } = require("fs");
require("./config/mongodb");
/* create keys
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
-keyout localhost-privkey.pem -out localhost-cert.pem
*/

/**
 *  Manipulador do print dos servidores 
 * @param {http|https} server 
 * @param {String} protocolo 
 */
function handlerPrintServer(server, protocolo = "http") {
    return `Server ${protocolo} up, ${server.address().address}:${server.address().port}
                Family:${server.address().family}
                Ambiente: ${env}`;
}

const options = {
    key: readFileSync("./localhost-privkey.pem"),
    cert: readFileSync("./localhost-cert.pem"),
};

// server https
const serverHttps = https.createServer(options, app)
    .listen(port_https, "0.0.0.0", () => { // IPV4
        console.log(handlerPrintServer(serverHttps, "https"));
    });

// server http with IPV6
const server = http.createServer(app);
server.listen(port, "0.0.0.0", () => { // IPV6
    console.log(handlerPrintServer(server));
});
// const serverHttp2 = http2.createServer(options, app) // Experimental
//     .listen(3333, "0.0.0.0", () => {
// console.log(`Server http2 up, ${serverHttp2.address().address}:${serverHttp2.address().port}
//                 Family:${serverHttp2.address().family}
//                 Ambiente: ${env}`);
//     });


module.exports = server;
