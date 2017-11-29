const path = require("path");

require("dotenv-safe").load({
    path: path.join(__dirname, "../../.env"),
    sample: path.join(__dirname, "../../.env.example"),
});

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    port_https: process.env.PORT_HTTPS,
    database: {
        host: process.env.DB_HOST,
        vendor: process.env.DB_VENDOR.toLowerCase(),
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        schema: process.env.DB_SCHEMA,
    },
};
