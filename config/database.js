const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('survey', 'postgres', 'bulb123', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;