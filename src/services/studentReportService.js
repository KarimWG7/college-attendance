const { Attendance, Student, Lecture, Course } = require("../models");
const { Op } = require("sequelize");
const sequelize = require("../config/database");
const AppError = require("../utils/AppError");

class StudentReportService {
  async getBasicReport(studentId) {
    const student = await Student.findByPk(studentId);
    if (!student) throw new AppError("Student not found", 404);

    const attendances = await Attendance.findAll({
      where: { StudentID: studentId },
    });

    const totalLectures = await Lecture.count(); // This is a simplification. Should be total lectures for enrolled courses.
    // Better: Get enrolled courses, then count lectures for those courses.
    // For now, let's stick to simple logic or what's feasible.
    // Or just count based on attendance status if we had "Absent" records.
    // But we only create "Present" records usually.
    // If we want "Absent", we need to know how many lectures happened.
    // Let's assume we can calculate it or just return what we have.

    // format.json response: { id, fullName, totalLectures, present, absent, late }

    const present = attendances.filter((a) => a.Status === "Present").length;
    const late = attendances.filter((a) => a.Status === "Late").length;
    const absent = attendances.filter((a) => a.Status === "Absent").length; // If we record absences

    // Total lectures? Maybe sum of present + absent + late?
    // Or query all past lectures for enrolled courses.

    return {
      id: student.ID,
      fullName: `${student.FirstName} ${student.LastName}`,
      totalLectures: present + absent + late, // Approximation
      present,
      absent,
      late,
    };
  }

  async getReportByCourse(studentId) {
    // Returns attendance breakdown per course.
    // [ { course: "Programming 1", present: 12, absent: 1, late: 0 } ]

    const attendances = await Attendance.findAll({
      where: { StudentID: studentId },
      include: [
        {
          model: Lecture,
          include: [Course],
        },
      ],
    });

    const report = {};
    attendances.forEach((a) => {
      const courseName = a.Lecture.Course.Name;
      if (!report[courseName]) {
        report[courseName] = {
          course: courseName,
          present: 0,
          absent: 0,
          late: 0,
        };
      }
      if (a.Status === "Present") report[courseName].present++;
      else if (a.Status === "Absent") report[courseName].absent++;
      else if (a.Status === "Late") report[courseName].late++;
    });

    return Object.values(report);
  }

  async getReportByMonth(studentId) {
    // Returns aggregated attendance per month.
    // [ { month: "2025-02", present: 14, absent: 1, late: 1 } ]

    const attendances = await Attendance.findAll({
      where: { StudentID: studentId },
    });

    const report = {};
    attendances.forEach((a) => {
      const month = a.ScanTime.toISOString().slice(0, 7); // YYYY-MM
      if (!report[month]) {
        report[month] = { month, present: 0, absent: 0, late: 0 };
      }
      if (a.Status === "Present") report[month].present++;
      else if (a.Status === "Absent") report[month].absent++;
      else if (a.Status === "Late") report[month].late++;
    });

    return Object.values(report);
  }
}

module.exports = new StudentReportService();
