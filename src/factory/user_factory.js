const { required } = require("joi");

const Response = require("src/utils/response"),
    StatusCodes = require("src/utils/status_codes"),
    ResponseMessages = require("src/utils/response_messages"),
    to = require("src/utils/promise_handler"),
    model = require('src/models/user_model'),
    dbInterface = require("src/interfaces/db.interface"),
    _ = require('lodash'),
    Interface = new dbInterface(model);

/**
 * @param request
 * @param h
 * @private
 */
exports.userRegistration = async (request, h) => {

    try {
        let condition = {
            email_id: request.payload.email_id
        };
        [err, response_data] = await to(Interface.findOne(condition, {}));
        if (err) {
            return h.response(Response.sendResponse(false, err, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST)).code(StatusCodes.BAD_REQUEST);
        } else {
            if (response_data && response_data != null) {
                return h.response(Response.sendResponse(false, err,
                    ResponseMessages.EMAIL_ALREADY_PRESENT,
                    StatusCodes.BAD_REQUEST,),
                ).code(StatusCodes.BAD_REQUEST);
            } else {
                [err, response_data] = await to(Interface.createOne(request.payload));
                if (err) {
                    return h.response(Response.sendResponse(false, err,
                        ResponseMessages.ERROR,
                        StatusCodes.BAD_REQUEST,),
                    ).code(StatusCodes.BAD_REQUEST);
                } else {
                    return h.response(Response.sendResponse(true, response_data,
                        ResponseMessages.SUCCESS,
                        StatusCodes.OK,),
                    ).code(StatusCodes.OK);
                }
            }
        }
    } catch (err) {
        return h.response(Response.sendResponse(false, err,
            ResponseMessages.ERROR,
            StatusCodes.BAD_REQUEST,),
        ).code(StatusCodes.BAD_REQUEST);
    }
};


/**
 * @param request
 * @param h
 * @private
 */
exports.userLogin = async function (request, h) {
    let response_data = null;

    try {
        [err, response_data] = await to(Interface.findOne(request.payload, {}));
        if (err) {
            return h.response(Response.sendResponse(false, err, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST)).code(StatusCodes.BAD_REQUEST);
        } else {
            if (response_data && response_data != null) {

                return h.response(Response.sendResponse(true, null, ResponseMessages.SUCCESS, StatusCodes.OK)).code(StatusCodes.OK);
            } else {

                return h.response(Response.sendResponse(false, err, ResponseMessages.INVALID_USER, StatusCodes.BAD_REQUEST)).code(StatusCodes.BAD_REQUEST);
            }
        }
    } catch (err) {
        return h.response(Response.sendResponse(false, err, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST)).code(StatusCodes.BAD_REQUEST);
    }
};

/**
 * @param request
 * @param h
 * @private
 */
exports.getUsers = async function (request, h) {
    let response_data = null;
    condition = {};
    if (request.query && request.query.first_name) {

        condition['first_name'] = request.query.first_name;
    }
    if (request.query && request.query.last_name) {

        condition['last_name'] = request.query.last_name;
    }
    if (request.query && request.query.employee_id) {

        condition['employee_id'] = request.query.employee_id;
    }
    
    // console.log(condition);
    try {

        [err, response_data] = await to(Interface.find(condition, {}, request.query));
        if (err) {
            return h.response(Response.sendResponse(false, err, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST)).code(StatusCodes.BAD_REQUEST);
        } else {

            let result = [];
            if (request.query && request.query.sort_by) {
                let sort_by = request.query.sort_by;
                result = response_data.sort((a, b) => a[sort_by].localeCompare(b[sort_by]));
            } else {
                result = response_data;
            }
            return h.response(Response.sendResponse(true, result, ResponseMessages.SUCCESS, StatusCodes.OK)).code(StatusCodes.OK);
        }
    } catch (err) {
        return h.response(Response.sendResponse(false, err, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST)).code(StatusCodes.BAD_REQUEST);
    }
};


