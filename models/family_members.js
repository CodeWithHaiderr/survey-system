const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/database");
const Family = require("./family");

const FamilyMember = sequelize.define("FamilyMember", {
  member_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  family_id: {
    // Added family_id foreign key
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  member_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  member_age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  member_gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  house_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isHead: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  member_occupation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  member_office: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  office_emp_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  office_location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  monthly_income: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  annual_income: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  monthly_expense: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  isStudent: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  student_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  student_roll_no: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  institute_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  institute_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  institute_location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  institute_city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  student_class: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  monthly_fee: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  annual_fee: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  remaining_fee: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  isEmployeed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  isEmployeed_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isEmployeed_office_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isEmployeed_office_location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isEmployeed_monthly_income: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  isEmployeed_monthly_expense: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
});

FamilyMember.associate = (models) => {
  FamilyMember.belongsTo(models.Family);
};

module.exports = FamilyMember;