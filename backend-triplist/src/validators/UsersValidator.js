const { Segments, Joi } = require('celebrate');

let userValidate = new Object();

userValidate.createUser = {
    [Segments.BODY]: Joi.object().keys({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        age: Joi.number().required(),
        nationality: Joi.string().required(),
    })
}

userValidate.delete = {
    [Segments.PARAMS]: Joi.object().keys({
        user_id: Joi.string().required(),
        firstname: Joi.string().required(),
    })
}
module.exports = userValidate;