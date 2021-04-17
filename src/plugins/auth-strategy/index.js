const { mapValuesSeries } = require('async');
const { decode } = require('jsonwebtoken');
const log = require('logger/logger'),
    config = require('config'),
    StatusCodes = require('src/utils/status_codes'),
    Response = require('src/utils/response');
    jwt2 = require('hapi-auth-jwt2');

const ResponseMessages = require('src/utils/response_messages');
const Constants = require('../../utils/constants');

const register = async server => {
    try {
        const validate = async (decoded, request, h) => {
            console.log('in validate... .');
            try {
                // console.log(decoded);
                if (decoded.username === Constants.USERNAME && decoded.password === Constants.PASSWORD) {
                    return {isValid: true, credentials: {name: decoded.username}};
                } else {
                    return ({response: h.response(Response.sendResponse(false, null, ResponseMessages.INVALID_USER, StatusCodes.BAD_REQUEST)).code(StatusCodes.BAD_REQUEST).takeover()});
                }
            } catch (error) {
                return ({response: h.response(Response.sendResponse(false, error, ResponseMessages.INVALID_USER, StatusCodes.BAD_REQUEST)).code(StatusCodes.BAD_REQUEST).takeover()});
            }
       }

		let registered = server.register(jwt2);
        server.auth.strategy('jwt', 'jwt',
			{
				validate,
				key: config.secret_key
			});
		server.auth.default('jwt');
        return registered;
    } catch (err) {
        log.info(`Error registering auth strategy plugin: ${err}`);
    }
};

module.exports = {
    register,
	info: { name: "hapi-auth-jwt2", version: "8.1.0" },
};
