const mongoose = require("../../config/mongodb");
const bcrypt = require("bcrypt-nodejs");

const SALT_WORK_FACTOR = 10;
/**
 * Schema do Usuarios 
 */
const Users = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Já existe Alguem com esse Username!"],
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Já existe Alguem com esse Email!"],
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    tipo: {
        type: String,
        enum: ["ADMIN", "USUARIO"],
        default: "USUARIO",
        required: true,
    },
});
Users.pre("save", function (next) {
    if (this.password) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(SALT_WORK_FACTOR, null));
    }
    next();
});
// methods ======================
// generating a hash
Users.methods.generateHash = password =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_WORK_FACTOR, null));

// checking if password is valid
Users.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("users", Users);
