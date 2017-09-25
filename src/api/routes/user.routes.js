const express = require("express");
const { listarUsuarios, loadUser, get, deleteUser, update } = require("../controllers/user.controller");
const validate = require('express-validation')
const { registrar } = require("../validations/user.validation")
const router = express.Router();


router.route("/")
    .get(listarUsuarios)

router
    .route("/:id")
    .get(loadUser)
    .put(validate(registrar), update)
    .delete(deleteUser)

module.exports = router;