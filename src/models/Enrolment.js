const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Student = require("./Student");
const Course = require("./Course");

const Enrolment = sequelize.define(
  "Enrolment",
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    StudentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "ID",
      },
    },
    CourseID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Course,
        key: "ID",
      },
    },
  },
  {
    tableName: "Enrolments",
    timestamps: false,
  }
);

Enrolment.belongsTo(Student, { foreignKey: "StudentID" });
Enrolment.belongsTo(Course, { foreignKey: "CourseID" });
Student.hasMany(Enrolment, { foreignKey: "StudentID" });
Course.hasMany(Enrolment, { foreignKey: "CourseID" });

module.exports = Enrolment;
