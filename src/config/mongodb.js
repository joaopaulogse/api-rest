const mongoogse = require('mongoose')
const vars = require("./vars")
mongoogse.Promise = global.Promise

if(vars.env === 'development'){

    mongoogse.connect("mongodb://localhost/mydb", {
        useMongoClient: true 
    })
}else if(vars.env === 'test'){
    mongoogse.connect("mongodb://localhost/testIntegration", {
        useMongoClient: true
    })
}
mongoogse.connection.on("open", ()=>{
    console.log("Database connected")
})
console.log("Ambiente: ", vars.env)
module.exports = mongoogse;
