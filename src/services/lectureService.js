const { Lecture, Course } = require("../models");
const AppError = require("../utils/AppError");

class LectureService {
  async createLecture(data) {
    return await Lecture.create(data);
  }

  async getAllLectures() {
    return await Lecture.findAll({ include: Course });
  }

  async getLectureById(id) {
    const lecture = await Lecture.findByPk(id, { include: Course });
    if (!lecture) {
      throw new AppError("Lecture not found", 404);
    }
    return lecture;
  }

  async updateLecture(id, data) {
    const lecture = await Lecture.findByPk(id);
    if (!lecture) {
      throw new AppError("Lecture not found", 404);
    }
    await lecture.update(data);
    return lecture;
  }

  async deleteLecture(id) {
    const lecture = await Lecture.findByPk(id);
    if (!lecture) {
      throw new AppError("Lecture not found", 404);
    }
    await lecture.destroy();
    return { message: "Lecture deleted successfully" };
  }
}

module.exports = new LectureService();
