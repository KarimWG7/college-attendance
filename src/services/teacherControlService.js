const {
  Lecture,
  Attendance,
  Student,
  Enrolment,
  Course,
} = require("../models");
const AppError = require("../utils/AppError");

class TeacherControlService {
  async openLecture(lectureId) {
    const lecture = await Lecture.findByPk(lectureId);
    if (!lecture) throw new AppError("Lecture not found", 404);
    await lecture.update({ State: "Active" });
    return lecture;
  }

  async closeLecture(lectureId) {
    // Close all open sessions for this lecture
    const lecture = await Lecture.findByPk(lectureId);
    if (!lecture) throw new AppError("Lecture not found", 404);
    await lecture.update({ State: "Closed" });
    return lecture;
  }

  async changeRoom(lectureId, room) {
    const lecture = await Lecture.findByPk(lectureId);
    if (!lecture) throw new AppError("Lecture not found", 404);

    await lecture.update({ Room: room });
    return lecture;
  }

  async forceAttendance(studentId, lectureId) {
    // Manually mark present
    // Check if already exists
    const existing = await Attendance.findOne({
      where: { StudentID: studentId, LectureID: lectureId },
    });

    if (existing) {
      await existing.update({ Status: "Present", ScanTime: new Date() });
      return existing;
    }

    return await Attendance.create({
      StudentID: studentId,
      LectureID: lectureId,
      ScanTime: new Date(),
      Status: "Present",
    });
  }

  async markAbsent(studentId, lectureId) {
    const existing = await Attendance.findOne({
      where: { StudentID: studentId, LectureID: lectureId },
    });

    if (existing) {
      await existing.update({ Status: "Absent" });
      return existing;
    }

    return await Attendance.create({
      StudentID: studentId,
      LectureID: lectureId,
      ScanTime: new Date(),
      Status: "Absent",
    });
  }

  async removeAttendance(studentId, lectureId) {
    const existing = await Attendance.findOne({
      where: { StudentID: studentId, LectureID: lectureId },
    });

    if (existing) {
      await existing.destroy();
    }
    return { message: "Attendance removed" };
  }

  async markLate(studentId, lectureId) {
    const existing = await Attendance.findOne({
      where: { StudentID: studentId, LectureID: lectureId },
    });

    if (existing) {
      await existing.update({ Status: "Late", ScanTime: new Date() });
      return existing;
    }

    return await Attendance.create({
      StudentID: studentId,
      LectureID: lectureId,
      ScanTime: new Date(),
      Status: "Late",
    });
  }

  async getPresentStudents(lectureId) {
    const attendances = await Attendance.findAll({
      where: { LectureID: lectureId, Status: "Present" },
      include: [Student],
    });
    return attendances.map((a) => a.Student);
  }

  async getAbsentStudents(lectureId) {
    // Get all enrolled students minus those who are present/late
    const lecture = await Lecture.findByPk(lectureId);
    if (!lecture) throw new AppError("Lecture not found", 404);

    const enrolments = await Enrolment.findAll({
      where: { CourseID: lecture.CourseID },
      include: [Student],
    });

    const allStudents = enrolments.map((e) => e.Student);

    const attendances = await Attendance.findAll({
      where: { LectureID: lectureId },
    });

    const attendedStudentIds = attendances.map((a) => a.StudentID);

    return allStudents.filter((s) => !attendedStudentIds.includes(s.ID));
  }
}

module.exports = new TeacherControlService();
