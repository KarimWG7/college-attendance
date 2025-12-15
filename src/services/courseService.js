const { Course } = require("../models");
const AppError = require("../utils/AppError");

class CourseService {
  async createCourse(data) {
    return await Course.create(data);
  }

  async getAllCourses() {
    return await Course.findAll();
  }

  async getCourseById(id) {
    const course = await Course.findByPk(id);
    if (!course) {
      throw new AppError("Course not found", 404);
    }
    return course;
  }

  async updateCourse(id, data) {
    const course = await Course.findByPk(id);
    if (!course) {
      throw new AppError("Course not found", 404);
    }
    await course.update(data);
    return course;
  }

  async deleteCourse(id) {
    const course = await Course.findByPk(id);
    if (!course) {
      throw new Error("Course not found");
    }
    await course.destroy();
    return { message: "Course deleted successfully" };
  }
}

module.exports = new CourseService();
