const sequelize = require("../config/database");
const Department = require("./Department");
const Student = require("./Student");
const Course = require("./Course");
const Instructor = require("./Instructor");
const Lecture = require("./Lecture");
const Enrolment = require("./Enrolment");
const Attendance = require("./Attendance");

// Associations
Department.hasMany(Student, { foreignKey: "DepartmentID" });
Student.belongsTo(Department, { foreignKey: "DepartmentID" });

Course.hasMany(Lecture, { foreignKey: "CourseID" });
Lecture.belongsTo(Course, { foreignKey: "CourseID" });

Student.hasMany(Enrolment, { foreignKey: "StudentID" });
Enrolment.belongsTo(Student, { foreignKey: "StudentID" });

Course.hasMany(Enrolment, { foreignKey: "CourseID" });
Enrolment.belongsTo(Course, { foreignKey: "CourseID" });

Lecture.hasMany(Attendance, { foreignKey: "LectureID" });
Attendance.belongsTo(Lecture, { foreignKey: "LectureID" });

Student.hasMany(Attendance, { foreignKey: "StudentID" });
Attendance.belongsTo(Student, { foreignKey: "StudentID" });

module.exports = {
  sequelize,
  Department,
  Student,
  Course,
  Instructor,
  Lecture,
  Enrolment,
  Attendance,
};
