
const Mongoose = require("mongoose"),
      Config = require('config'),
      log = require('logger/logger');


const init = () => {

  let connection_uri = '';
  if(Config.database.mongo.username && Config.database.mongo.password) {
      connection_uri = `mongodb://${Config.database.mongo.username}:${Config.database.mongo.password}@${Config.database.mongo.host}:${Config.database.mongo.port}/${Config.database.mongo.name}?authSource=admin`;
  } else {
      connection_uri = `mongodb://${Config.database.mongo.host}:${Config.database.mongo.port}/${Config.database.mongo.name}`;
  }
  Mongoose.connect(connection_uri, {
      // useMongoClient: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000 });

      Mongoose.connection.on('connected', function () {
      log.info('Mongoose default connection open to ' + 'mongodb://' + Config.database.mongo.host + '/' + Config.database.mongo.name);
  });

  Mongoose.connection.on('error', function (err) {
      log.info('Mongoose default connection error: ' + err);
      init();
  });


  Mongoose.connection.on('disconnected', function () {
      log.info('Mongoose default connection disconnected');
  });


  process.on('SIGINT', function () {
    Mongoose.connection.close(function () {
          log.info('Mongoose default connection disconnected through app termination');
          process.exit(0);
      });
  });
};

exports.close = async () => {
    console.log('MongoDB Closed.........!');
  return await Mongoose.connection.close();
};

exports.init = init;