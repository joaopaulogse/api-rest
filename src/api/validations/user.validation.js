const Joi = require("joi");

module.exports = {

    registrar: {
        body: {
            username: Joi.string().min(3).required(),
            password: Joi.string().min(6).max(20).required(),
            email: Joi.string().email().required(),
            tipo: Joi.strict()
        }
    },
    updateValidation:{
        body: {
            username: Joi.string().min(3).required(),
            password: Joi.string().min(6).max(20).required(),
            email: Joi.string().email().required(),
            tipo: Joi.strict()
        }
    }


}