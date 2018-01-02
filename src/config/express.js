const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const routes = require("../api/routes");
const logger = require("morgan");
const session = require("express-session");
const cors = require("./cors");
const { secret } = require("./vars");
const { error404, error400 } = require("../api/middleware/error");
const passport = require("passport");

const app = express();

/** Cors */
app.use(cors);

app.use(helmet());
app.use(logger("common", { immediate: true }));

app.set("trust proxy", 1);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
}));
app.use(passport.initialize());
app.use(passport.session());
require("./passport");

app.use(routes);

/** Middlewares de error */
app.use(error404);
app.use(error400);


module.exports = app;
