const express = require("express");
const { listarUsuarios, loadUser, get, deleteUser, update } = require("../controllers/user.controller");

const router = express.Router();


router.route("/")
    .get(listarUsuarios)

router
    .route("/:id")
    .get(loadUser)
    .put(update)
    .delete(deleteUser)

module.exports = router;