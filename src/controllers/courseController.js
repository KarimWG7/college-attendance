const courseService = require("../services/courseService");
const CourseDTO = require("../dtos/courseDto");
const AppError = require("../utils/AppError");

class CourseController {
  async add(req, res, next) {
    try {
      const courseData = CourseDTO.validate(req.body);
      await courseService.createCourse(courseData);
      res.status(201).json({
        message: "Course added successfully",
      });
    } catch (error) {
      if (error.message === "Invalid Course Name") {
        return next(new AppError(error.message, 400));
      }
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const courses = await courseService.getAllCourses();
      res.status(200).json(courses.map((c) => new CourseDTO(c)));
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const course = await courseService.getCourseById(id);
      res.status(200).json(new CourseDTO(course));
    } catch (error) {
      if (error.message === "Course not found") {
        return next(new AppError(error.message, 404));
      }
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = {};
      if (req.body.name) updateData.Name = req.body.name;
      if (req.body.code) updateData.Code = req.body.code;
      if (req.body.instructorID)
        updateData.InstructorID = req.body.instructorID;
      if (req.body.level) updateData.Level = req.body.level;

      await courseService.updateCourse(id, updateData);
      res.status(200).send();
    } catch (error) {
      if (error.message === "Course not found") {
        return next(new AppError(error.message, 404));
      }
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await courseService.deleteCourse(id);
      res.status(200).json({
        message: "Course deleted successfully",
      });
    } catch (error) {
      if (error.message === "Course not found") {
        return next(new AppError(error.message, 404));
      }
      next(error);
    }
  }

  async changeInstructor(req, res, next) {
    try {
      const { id, instructorID } = req.body;
      await courseService.updateCourse(id, { InstructorID: instructorID });
      res.status(200).send();
    } catch (error) {
      if (error.message === "Course not found") {
        return next(new AppError(error.message, 404));
      }
      next(error);
    }
  }
}

module.exports = new CourseController();
