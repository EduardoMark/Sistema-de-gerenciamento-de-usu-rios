require('dotenv').config({path: '../../.env'});
const { Sequelize } = require("sequelize");

const dbName = process.env.DB_NAME;
const database = process.env.DATABASE;
const dbPassword = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;

const sequelize = new Sequelize(dbName, database, dbPassword, {
    dialect: 'postgres',
    host: dbHost,
    logging: false
});

module.exports = sequelize;