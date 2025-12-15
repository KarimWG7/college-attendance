const studentReportService = require("../services/studentReportService");
const AppError = require("../utils/AppError");

class StudentReportController {
  async getBasicReport(req, res, next) {
    try {
      const { studentId } = req.params;
      const report = await studentReportService.getBasicReport(studentId);
      res.status(200).json(report);
    } catch (error) {
      if (error.message === "Student not found") {
        return next(new AppError(error.message, 404));
      }
      next(error);
    }
  }

  async getReportByCourse(req, res, next) {
    try {
      const { studentId } = req.params;
      const report = await studentReportService.getReportByCourse(studentId);
      res.status(200).json(report);
    } catch (error) {
      next(error);
    }
  }

  async getReportByMonth(req, res, next) {
    try {
      const { studentId } = req.params;
      const report = await studentReportService.getReportByMonth(studentId);
      res.status(200).json(report);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StudentReportController();
