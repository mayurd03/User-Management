/*
 * requests Validations File
 */

const { allow } = require('joi');
const Joi = require('joi');

module.exports = Object.freeze({
    userRegistration: {
        payload: {
            first_name: Joi.string().required().example('ABC'),
            last_name: Joi.string().optional().example('DEF'),
            email_id: Joi.string().required().example('abc.def@xyz.com'),
            password: Joi.string().required().example('12345'),
            employee_id: Joi.string().required().example('123456789'),
            organization_name: Joi.string().required().example('Organization')
        },
        headers: Joi.object({'authorization': Joi.string().required()}).options({allowUnknown: true})
    },


    userLogin:{
        payload: {
            email_id: Joi.string().required().example('abc.def@xyz.com'),
            password: Joi.string().required().example('12345'),
        },
        headers: Joi.object({'authorization': Joi.string().required()}).options({allowUnknown: true})
    },

    getUsers: {
        query: {
            first_name: Joi.string().example('ABC'),
            last_name: Joi.string().example('DEF'),
            employee_id: Joi.string().example('123456789'),
            sort_by: Joi.string().valid('first_name', 'last_name', 'email_id', 'employee_id', 'organization_name').example('first_name').description('entity by which result is sorted'),
            page_no: Joi.number().allow(null),
            page_size: Joi.number().allow(null),
        },
        headers: Joi.object({'authorization': Joi.string().required()}).options({allowUnknown: true})
    }

});
