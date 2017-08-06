const User = require("../models/user.model");
const HttpStatus = require("http-status");


exports.create = function(req, res) {
    const { username, password, email, tipo } = req.body;
    User.create({ username, password, email, tipo }).then(users => {
            res.status(HttpStatus.OK).send(users)
        })
        .catch(err => {
            res.status(HttpStatus.BAD_REQUEST).send(err);
            console.error(err);
        })
}
exports.listarUsuarios = (req, res) => {
    User.findAll().then(users => {
            res.status(HttpStatus.OK).json(users);
        })
        .catch(err => {
            res.status(HttpStatus.NOT_FOUND).send('Não foi possivel buscar os Usuários!');
            console.error(err);
        });
}
exports.loadUser = (req, res, next) => {
    User.findById(req.params.id).then(user => res.status(HttpStatus.OK).send(user))
        .catch(err => {
            res.status(HttpStatus.NOT_FOUND).send("não achado!");
            console.error(err);
        })
}
exports.update = (req, res, next) => {
    const { username, email, tipo } = req.body;
    User.update({ username, email, tipo }, { where: { id: req.params.id } })
        .then(() => res.status(HttpStatus.NO_CONTENT))
        .catch(err => {
            res.status(HttpStatus.BAD_REQUEST).send("Não foi alterado!");
            console.error(err);
        })
}
exports.deleteUser = (req, res, next) => {
    User.destroy({ where: { id: req.params.id } })
        .then(() => res.status(HttpStatus.NO_CONTENT))
        .catch(err => {
            res.status(HttpStatus.BAD_REQUEST).send("não foi possivel deletar!")
            console.error(err);
        })
}