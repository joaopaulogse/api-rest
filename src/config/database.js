const Sequelize = require("sequelize");
const { database } = require("./vars");

const sequelize = new Sequelize(database.name, database.user, database.password, {
    host: database.host,
    dialect: database.vendor,
    port: 5432,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        schema: database.schema
    },
    sync: {
        force: true
    }
});
sequelize
    .authenticate()
    .then(() => console.info("Connection done!"))
    .catch(err => {
        console.error(`Connection failed! ${err}`);
        process.exit(-1);
    });

module.exports = { sequelize, DataTypes: Sequelize };