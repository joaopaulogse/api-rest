const mongoose = require("../../config/mongodb");

const Users = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:new Date.now
    }
})

module.exports = mongoose.model('users', Users)