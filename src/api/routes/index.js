const express = require("express");
const validate = require("express-validation");
const { create } = require("../controllers/user.controller");
const { registrar } = require("../validations/user.validation");
const routerUser = require("./user.routes");
const graphqlHTTP = require("express-graphql");
const { schema } = require("../models/UserSchema");
const login = require("./login.routes");

const router = express.Router();

router.use("/users", routerUser);
router.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true,
}));
router.post("/cadastro", validate(registrar), create);
router.use("/auth", login);

module.exports = router;
