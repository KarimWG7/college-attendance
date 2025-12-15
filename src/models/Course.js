const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Course = sequelize.define(
  "Course",
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
    Code: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    InstructorID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Level: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "Courses",
    timestamps: false,
  }
);

module.exports = Course;
