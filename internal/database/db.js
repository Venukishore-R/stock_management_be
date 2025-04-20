const { Sequelize } = require('sequelize')
const config = require('../../config/config')

const db = new Sequelize(
    config.dbName,
    config.user,
    config.password,
    {
        host: config.host,
        dialect: 'postgres',
        ssl: true,
    },
);

module.exports = db;
