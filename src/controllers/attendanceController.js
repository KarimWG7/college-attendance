const attendanceService = require("../services/attendanceService");
const AttendanceDTO = require("../dtos/attendanceDto");
const AppError = require("../utils/AppError");

class AttendanceController {
  async scan(req, res, next) {
    try {
      const { nfcTag } = req.body;
      if (!nfcTag) {
        return res.status(400).send("TAG");
      }
      const result = await attendanceService.scanNfcTag(nfcTag);
      res.status(200).send(result);
    } catch (error) {
      if (error.isOperational) {
        return res.status(error.statusCode).send(error.message);
      }
      console.error("Scan Error:", error);
      res.status(500).send("ERR");
    }
  }

  async create(req, res, next) {
    try {
      const attendanceData = AttendanceDTO.validate(req.body);
      const attendance = await attendanceService.createAttendance(
        attendanceData
      );
      res.status(201).json({
        success: true,
        data: new AttendanceDTO(attendance),
      });
    } catch (error) {
      if (error.message === "Missing required fields") {
        return next(new AppError(error.message, 400));
      }
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const attendances = await attendanceService.getAllAttendances();
      res.status(200).json(attendances.map((a) => new AttendanceDTO(a)));
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const attendance = await attendanceService.getAttendanceById(id);
      res.status(200).json(new AttendanceDTO(attendance));
    } catch (error) {
      if (error.message === "Attendance not found") {
        return next(new AppError(error.message, 404));
      }
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = {};
      if (req.body.studentId) updateData.StudentID = req.body.studentId;
      if (req.body.lectureId) updateData.LectureID = req.body.lectureId;
      if (req.body.scanTime) updateData.ScanTime = req.body.scanTime;
      if (req.body.status) updateData.Status = req.body.status;

      const attendance = await attendanceService.updateAttendance(
        id,
        updateData
      );
      res.status(200).json(new AttendanceDTO(attendance));
    } catch (error) {
      if (error.message === "Attendance not found") {
        return next(new AppError(error.message, 404));
      }
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await attendanceService.deleteAttendance(id);
      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      if (error.message === "Attendance not found") {
        error.statusCode = 404;
      }
      next(error);
    }
  }
}

module.exports = new AttendanceController();
