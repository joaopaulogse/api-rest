const HttpStatus = require("http-status");

exports.error404 = (req, res, next) => {
    res.status(HttpStatus.NOT_FOUND).json({
        error: "url not found"
    });
    next();
}

exports.error400 = (err, req, res, next) =>{
    res.status(HttpStatus.BAD_REQUEST).json({
        error: err.errors,
        status: err.status,
        statusText: err.statusText
    })
    next()
}