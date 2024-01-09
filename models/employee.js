const {Sequelize,DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const Family = require('./family');
const sequelize = require('../config/database');


const Employees = sequelize.define('Employees', {
    employee_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    employee_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    employee_username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    employee_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    employee_area: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    no_of_surveys: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    token: {
        type: DataTypes.STRING,
    },
});

Employees.hasMany(Family, {foreignKey: 'employee_id'});

Employees.beforeCreate(async (employee) => {
    const hashedPassword = await bcrypt.hash(employee.employee_password, 10);
    employee.employee_password = hashedPassword;
});

module.exports = Employees;