const config = require('config');

module.exports = Object.freeze({
	METHODS: {
		GET: "GET",
		POST: "POST",
		PUT: "PUT",
		DELETE: "DELETE",
	},

	USERNAME: 'admin',

	PASSWORD: 'password',

	SECRET_KEY: config.secret_key
});
