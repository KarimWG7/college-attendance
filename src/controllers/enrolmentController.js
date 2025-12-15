const enrolmentService = require("../services/enrolmentService");
const EnrolmentDTO = require("../dtos/enrolmentDto");
const AppError = require("../utils/AppError");

class EnrolmentController {
  async create(req, res, next) {
    try {
      const enrolmentData = EnrolmentDTO.validate(req.body);
      const enrolment = await enrolmentService.createEnrolment(enrolmentData);
      res.status(201).json({
        success: true,
        data: new EnrolmentDTO(enrolment),
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
      const enrolments = await enrolmentService.getAllEnrolments();
      res.status(200).json({
        success: true,
        data: enrolments.map((e) => new EnrolmentDTO(e)),
      });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const enrolment = await enrolmentService.getEnrolmentById(id);
      res.status(200).json({
        success: true,
        data: new EnrolmentDTO(enrolment),
      });
    } catch (error) {
      if (error.message === "Enrolment not found") {
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
      if (req.body.courseId) updateData.CourseID = req.body.courseId;

      const enrolment = await enrolmentService.updateEnrolment(id, updateData);
      res.status(200).json({
        success: true,
        data: new EnrolmentDTO(enrolment),
      });
    } catch (error) {
      if (error.message === "Enrolment not found") {
        return next(new AppError(error.message, 404));
      }
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await enrolmentService.deleteEnrolment(id);
      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      if (error.message === "Enrolment not found") {
        return next(new AppError(error.message, 404));
      }
      next(error);
    }
  }
}

module.exports = new EnrolmentController();
