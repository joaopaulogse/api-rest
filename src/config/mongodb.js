const mongoogse = require('mongoose')
mongoogse.Promise = global.Promise

mongoogse.connect("mongodb://localhost/mydb", {
    server:{
        poolSize:5
    }
})
mongoogse.connection.on("open", ()=>{
    console.log("Database connected")
})
module.exports = mongoogse;
