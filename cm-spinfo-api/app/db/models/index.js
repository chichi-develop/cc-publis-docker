'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const log4js = require('log4js');
const logger = log4js.getLogger('sequelize');

const options = Object.assign({}, config, {
  benchmark: true,
  logging: (logStr, execTime, options) => {
    logger.debug(`[${execTime} ms]`, logStr)
  }
})

let sequelize;
if (options.use_env_variable) {
  sequelize = new Sequelize(process.env[options.use_env_variable], options);
} else {
  sequelize = new Sequelize(options.database, options.username, options.password, options);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
