require("app-module-path").addPath(__dirname);
 
const log = require("logger/logger");
const Server = require("./server");

const MongoDatabase = require("./databases/mongodb");
// var rabbitmq = require('servers/rabbitmq_server');
// var socket = require('src/factory/user_factory');

// require('app-module-path').addPath(__dirname);
log.info(`Running environment ==> ${process.env.NODE_ENV}`);

// Catch unhandling unexpected exceptions
process.on("uncaughtException", error => {
	log.error(`uncaughtException ==> ${error.message}`);
});

// Catch unhandling rejected promises
process.on("unhandledRejection", reason => {
	log.error(`unhandledRejection ==> ${reason}`);
});

// Init Database
MongoDatabase.init();

//Start node server
Server.init();

//Starting rabbitmq server
// rabbitmq.createConnection();

