const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Department = sequelize.define(
  "Department",
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: "Departments",
    timestamps: false,
  }
);

module.exports = Department;
