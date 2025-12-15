const {
  Attendance,
  Student,
  Lecture,
  Course,
  Enrolment,
} = require("../models");
const { Op } = require("sequelize");
const AppError = require("../utils/AppError");

class AttendanceService {
  async scanNfcTag(nfcTag) {
    // 1. Find Student by NFC Tag
    const student = await Student.findOne({ where: { NFC_Tag: nfcTag } });
    if (!student) {
      throw new AppError("SNF", 404);
    }

    // 2. Find Active Lecture (State = 'Active')
    // Get student's enrolments
    const enrolments = await Enrolment.findAll({
      where: { StudentID: student.ID },
    });
    const courseIds = enrolments.map((e) => e.CourseID);

    // Find active lectures for these courses
    // Assumes there's only one active lecture at a time for these courses, or we pick the first one.
    // We check Lecture.State, which we just added.
    const activeLecture = await Lecture.findOne({
      where: {
        CourseID: { [Op.in]: courseIds },
        State: "Active", // Or "Open", matching what we used in the merged model. Let's stick to "Active" or verify what I should use. User didn't specify enum, so string "Active" is good.
      },
    });

    if (!activeLecture) {
      throw new AppError("NAL", 404);
    }

    // 3. Record Attendance
    // Check if already attended
    const existingAttendance = await Attendance.findOne({
      where: {
        StudentID: student.ID,
        LectureID: activeLecture.ID,
      },
    });

    if (existingAttendance) {
      throw new AppError("SAP", 400); // Student Already Present
    }

    const attendance = await Attendance.create({
      StudentID: student.ID,
      LectureID: activeLecture.ID,
      ScanTime: new Date(),
      Status: "Present",
    });

    return "SUC";
  }

  async createAttendance(data) {
    return await Attendance.create(data);
  }

  async getAllAttendances() {
    return await Attendance.findAll({ include: [Student, Lecture] });
  }

  async getAttendanceById(id) {
    const attendance = await Attendance.findByPk(id, {
      include: [Student, Lecture],
    });
    if (!attendance) {
      throw new AppError("Attendance not found", 404);
    }
    return attendance;
  }

  async updateAttendance(id, data) {
    const attendance = await Attendance.findByPk(id);
    if (!attendance) {
      throw new AppError("Attendance not found", 404);
    }
    await attendance.update(data);
    return attendance;
  }

  async deleteAttendance(id) {
    const attendance = await Attendance.findByPk(id);
    if (!attendance) {
      throw new AppError("Attendance not found", 404);
    }
    await attendance.destroy();
    return { message: "Attendance deleted successfully" };
  }
}

module.exports = new AttendanceService();
