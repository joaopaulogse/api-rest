const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const routes = require("../api/routes");
const { error404, error500 } = require("../api/middleware/error");

let app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

/** Middlewares de error*/
app.use(error404);



module.exports = app;