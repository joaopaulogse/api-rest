const express = require("express");
const validate = require("express-validation");
const { create } = require("../controllers/user.controller");
const { registrar } = require("../validations/user.validation");
const routerUser = require("./user.routes");

const router = express.Router();


router.use("/users", routerUser);
router.post("/cadastro", validate(registrar), create);

module.exports = router;