const { sequelize, DataTypes } = require("../../config/database");
const bcrypt = require("bcrypt-nodejs");


const User = sequelize.define("users", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        set(email) {
            this.setDataValue("email", email.toLowerCase());
        },
    },
    tipo: {
        type: DataTypes.ENUM(["admin", "user"]),
        defaultValue: "user",
        set(tipo) {
            this.setDataValue("tipo", tipo.toLowerCase());
        },
        comment: "Tipo do usuario!",
    },
}, {
    hooks: {
        beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.set("password", bcrypt.hashSync(user.password, salt));
        },
    },
    classMethods: {
        isPassword: (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword),
    },
});


module.exports = User;
