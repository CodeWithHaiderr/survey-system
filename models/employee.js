const { DataTypes } = require("sequelize");
const Family = require("./family");
const sequelize = require("../config/database");

const Employees = sequelize.define("Employees", {
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

Employees.hasMany(Family, { foreignKey: "employee_id" });

module.exports = Employees;