
const factory = require('src/factory/user_factory'),
    Validation = require('src/validations/user_validations'),
    Joi = require('joi');


const response_format = Joi.object({
    is_success: Joi.boolean(),
    result: Joi.any(),
    message: Joi.string().required(),
    status_code: Joi.number().required(), 
    }),
    response = {
        status : {
            200: response_format,
            201: response_format,
            400: response_format,
            500: response_format,
        },
    };


exports.userRegistration = {
    description : "Register New User",
    validate: Validation.userRegistration,
    auth: 'jwt',
    handler: (request, h) => {
        return factory.userRegistration(request, h);
    },
    response,
};

exports.userLogin = {
    description : "Login of Employee",
    validate: Validation.userLogin,
    auth: 'jwt',
    handler: (request, h) => {
        return factory.userLogin(request, h);
    },
    response,
};

exports.getUsers = {
    description : "Get all users per condition",
    validate: Validation.getUsers,
    auth: 'jwt',
    handler: (request, h) => {
        return factory.getUsers(request, h);
    },
    response,
};
