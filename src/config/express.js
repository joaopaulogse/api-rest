const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const routes = require("../api/routes");
const logger = require("morgan");
const cors = require("./cors")
const { error404, error400 } = require("../api/middleware/error");

const app = express();

app.use(helmet());
app.use(logger("[:date] - :method :url :status :response-time ms - :res[content-length]"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

/** Middlewares de error */
app.use(error404);
app.use(error400);

/** Cors */
app.use(cors)

module.exports = app;
