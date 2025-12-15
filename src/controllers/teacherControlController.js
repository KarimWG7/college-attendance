const teacherControlService = require("../services/teacherControlService");
const AppError = require("../utils/AppError");

class TeacherControlController {
  async openLecture(req, res, next) {
    try {
      const { lectureId } = req.params;
      await teacherControlService.openLecture(lectureId);
      res.status(200).json({ message: "Lecture opened successfully" });
    } catch (error) {
      if (error.message === "Lecture not found")
        return next(new AppError(error.message, 404));
      next(error);
    }
  }

  async closeLecture(req, res, next) {
    try {
      const { lectureId } = req.params;
      await teacherControlService.closeLecture(lectureId);
      res.status(200).json({ message: "Lecture closed successfully" });
    } catch (error) {
      next(error);
    }
  }

  async changeRoom(req, res, next) {
    try {
      const { lectureId } = req.params;
      const { room } = req.body; // format.json says PUT, implies body or query? "Uses query parameters: room" in description?
      // format.json: "Uses query parameters: room."
      // But method is PUT.
      // I'll check query first, then body.
      const roomVal = req.query.room || req.body.room;

      await teacherControlService.changeRoom(lectureId, roomVal);
      res.status(200).json({ message: "Room changed successfully" });
    } catch (error) {
      if (error.message === "Lecture not found")
        return next(new AppError(error.message, 404));
      next(error);
    }
  }

  async forceAttendance(req, res, next) {
    try {
      // format.json: "Uses query parameters: studentId, lectureId."
      const { studentId, lectureId } = req.query;
      await teacherControlService.forceAttendance(studentId, lectureId);
      res.status(200).json({ message: "Attendance forced successfully" });
    } catch (error) {
      next(error);
    }
  }

  async markAbsent(req, res, next) {
    try {
      const { studentId, lectureId } = req.body;
      await teacherControlService.markAbsent(studentId, lectureId);
      res.status(200).json({ message: "Student marked absent" });
    } catch (error) {
      next(error);
    }
  }

  async removeAttendance(req, res, next) {
    try {
      const { studentId, lectureId } = req.body;
      await teacherControlService.removeAttendance(studentId, lectureId);
      res.status(200).json({ message: "Attendance removed" });
    } catch (error) {
      next(error);
    }
  }

  async markLate(req, res, next) {
    try {
      const { studentId, lectureId } = req.body;
      await teacherControlService.markLate(studentId, lectureId);
      res.status(200).json({ message: "Student marked late" });
    } catch (error) {
      next(error);
    }
  }

  async getPresentStudents(req, res, next) {
    try {
      const { lectureId } = req.params;
      const students = await teacherControlService.getPresentStudents(
        lectureId
      );
      res.status(200).json(students);
    } catch (error) {
      next(error);
    }
  }

  async getAbsentStudents(req, res, next) {
    try {
      const { lectureId } = req.params;
      const students = await teacherControlService.getAbsentStudents(lectureId);
      res.status(200).json(students);
    } catch (error) {
      if (error.message === "Lecture not found")
        return next(new AppError(error.message, 404));
      next(error);
    }
  }

  async blockStudent(req, res, next) {
    try {
      // format.json: "Uses query parameters: studentId."
      const { studentId } = req.query;
      await teacherControlService.blockStudent(studentId);
      res.status(200).json({ message: "Student blocked" });
    } catch (error) {
      if (error.message === "Student not found")
        return next(new AppError(error.message, 404));
      next(error);
    }
  }
}

module.exports = new TeacherControlController();
