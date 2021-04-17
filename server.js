require("app-module-path").addPath(__dirname);
const Hapi = require("hapi"),
	Config = require("config");
	log = require("logger/logger"),
	_plugins = require("src/plugins/index"),
	Response = require("src/utils/response"),
	StatusCodes = require("src/utils/status_codes"),
	ResponseMessages = require("src/utils/response_messages");

exports.init = async database => {
	try {
		const port = process.env.PORT || Config.server.port;
		global.server = new Hapi.Server({
			debug: { request: ["error"] },
			port: port,
			state: {
                strictHeader: false,
                ignoreErrors: true
            },
			routes: {
				cors: true,
				timeout: {
					server: 1200000, // 1,200,000 or 20 minutes
					socket: 1300000
				},
				validate: {
					failAction: (request, h, error) => {
						return h.response(Response.sendResponse(false, error, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST)).code(StatusCodes.BAD_REQUEST).takeover();
					}
				}

			},
		});

		const pluginOptions = { database };

		let pluginPromises = [];

		_plugins().forEach(pluginName => {
			var plugin = require("./src/plugins/" + pluginName);
			log.info(`Register Plugin ${plugin.info.name} - ${plugin.info.version}`);
			pluginPromises.push(plugin.register(server, pluginOptions));
		});

		await Promise.all(pluginPromises);
		log.info("All plugins registered successfully.");

		let Routes = require("src/routes");
		for (const route in Routes) {
			console.log("### ROUTES => ", route);
			server.route(Routes[route]);
		}

		server.start();

		server.events.on("response", request => {
			if (request.response) {
				log.error(
					`${request.info.remoteAddress}: ${request.method.toUpperCase()} ${
						request.url.pathname
					} --> ${request.response.statusCode}`,
				);
			} else {
				log.info(
					"No statusCode : ",
					request.info.remoteAddress +
						": " +
						request.method.toUpperCase() +
						" " +
						request.url.pathname +
						" --> ",
				);
			}
		});

		server.events.on("route", route => {
			console.log(`New route added: ${route.path}`);
		});
		server.events.on("start", route => {
			log.info("Node server is running on ==> ", `http://${Config.server.host}:${Config.server.port}`);
		});
		server.events.on("stop", route => {
			console.log("Server has been stopped");
		});
		return server;
	} catch (err) {
		log.error("Error starting server: ", err);
		throw err;
	}
};
