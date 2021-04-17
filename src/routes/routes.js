/*
 * Notification Route File
 */

const controller = require('src/controllers/user_controller');

module.exports = [
	{
		method: 'POST',
		path: '/registration',
		config: controller.userRegistration
	},
	{
		method: 'POST',
		path: '/login',
		config: controller.userLogin
	},
	{
		method: 'GET',
		path: '/users',
		config: controller.getUsers
	}
];
