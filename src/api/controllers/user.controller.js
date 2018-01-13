// sequelize const User = require("../models/user.model");
const HttpStatus = require("http-status");
// mongodb
const Users = require("../models/users.model");

/**
 * Criação do Usuario
 * @param {Request} req 
 * @param {Response} res 
 */
exports.create = (req, res) => {
    const { username, password, email, tipo } = req.body;
    Users.create({ username, password, email, tipo })
        .then((users) => {
            res.setHeader("Content-Type", "application/json");
            res.status(HttpStatus.OK).send(users);
        })
        .catch((err) => {
            console.error(err.message);
            res.status(HttpStatus.BAD_REQUEST).send(err);
        });
};

/**
 * Lista todos os Usuarios
 * @param {Request} req 
 * @param {Response} res 
 */
exports.listarUsuarios = (req, res) => {
    Users.find().then((users) => {
        // console.log(req.sessionID);
        res.setHeader("Content-Type", "application/json");
        res.status(HttpStatus.OK).json({ users });
    });
};

/**
 * Carrega o Usuario {id}
 * @param {Request} req 
 * @param {Response} res 
 */
exports.loadUser = (req, res) => {
    Users.findById(req.params.id)
        .then(user => res.status(HttpStatus.OK).send(user))
        .catch((err) => {
            res.status(HttpStatus.NOT_FOUND).json({error:"não achado!"});
            console.error(err.message);
        });
};

/**
 * Atualiza o Usuarios {body}
 * @param {Request} req 
 * @param {Response} res 
 */
exports.update = (req, res) => {
    const { username, email, tipo, password } = req.body;
    Users.findByIdAndUpdate(req.params.id, { $set: { username, password, email, tipo } }, { 'new' : true })
        .then((user) => {
            res.setHeader("Content-Type", "application/json");
            res.status(HttpStatus.CREATED).send(user);
        })
        .catch((err) => {
            res.status(HttpStatus.BAD_REQUEST).send("Não foi alterado!");
            console.error(err.message);
        });
};

/**
 * Deleta o Usuario {id}
 * @param {Request} req 
 * @param {Response} res 
 */
exports.deleteUser = (req, res) => {
    if (req.isAuthenticated()) {
        Users.findByIdAndRemove(req.params.id)
            .then(() => {
                res.status(HttpStatus.CREATED).send("Deletado com Sucesso!");
            })
            .catch((err) => {
                res.status(HttpStatus.BAD_REQUEST).send("não foi possivel deletar!");
                console.error(err.message);
            });
    } else {
        res.status(HttpStatus.FORBIDDEN).send("Não autorizado!");
    }
};
