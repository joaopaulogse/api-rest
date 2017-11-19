const mongoogse = require("mongoose");
const vars = require("./vars");

mongoogse.Promise = global.Promise;

if (vars.env === "development") {
    mongoogse.connect("mongodb://mongo/mydb", {
        useMongoClient: true,
    });
} else if (vars.env === "test") {
    mongoogse.connect("mongodb://mongo/testIntegration", {
        useMongoClient: true,
    });
}
mongoogse.connection.on("open", () => {
    console.log("Database connected");
});
mongoogse.connection.on("error", (error, data) => {
    console.log("Database with Error: ", data.message);
});
module.exports = mongoogse;
