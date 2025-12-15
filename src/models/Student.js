const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Department = require("./Department");

const Student = sequelize.define(
  "Student",
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
    Email: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Password: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    DepartmentID: {
      type: DataTypes.INTEGER,
      references: {
        model: Department,
        key: "ID",
      },
    },
    NFC_Tag: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
    },
    Level: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    IsBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "Students",
    timestamps: false,
  }
);

Student.belongsTo(Department, { foreignKey: "DepartmentID" });
Department.hasMany(Student, { foreignKey: "DepartmentID" });

module.exports = Student;
