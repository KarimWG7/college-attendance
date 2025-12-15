const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Instructor = sequelize.define(
  "Instructor",
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FirstName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    LastName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Gmail: {
      type: DataTypes.STRING(50),
      unique: true,
    },
  },
  {
    tableName: "Instructors",
    timestamps: false,
  }
);

module.exports = Instructor;
