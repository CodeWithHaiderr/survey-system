const { DataTypes, Sequelize } = require('sequelize');
const Employees = require('./employee');
const sequelize = require('../config/database');
const FamilyMember = require('./family_members');

const Family = sequelize.define('Family', {
    family_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    house_address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total_income: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    total_expense: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});
Family.belongsTo(Employees, { foreignKey: 'employee_id' });
Family.hasMany(FamilyMember, { foreignKey: 'family_id' });

module.exports = Family;
