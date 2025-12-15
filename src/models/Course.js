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
    },
    Code: {
      type: DataTypes.STRING(20),
      unique: true,
    },
    InstructorID: {
      type: DataTypes.INTEGER,
    },
    Level: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Courses",
    timestamps: false,
  }
);

module.exports = Course;
