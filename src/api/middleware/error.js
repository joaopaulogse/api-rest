const HttpStatus = require("http-status");

exports.error404 = (req, res, next) => {
    res.status(HttpStatus.NOT_FOUND).json({
        error: "url not found"
    });
    next();
}