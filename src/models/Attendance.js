const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Attendance = sequelize.define(
  "Attendance",
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    StudentID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Students",
        key: "ID",
      },
    },
    LectureID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Lectures",
        key: "ID",
      },
    },
    ScanTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  },
  {
    tableName: "Attendance",
    timestamps: false,
  }
);

module.exports = Attendance;
