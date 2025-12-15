const { Enrolment, Student, Course } = require("../models");
const AppError = require("../utils/AppError");

class EnrolmentService {
  async createEnrolment(data) {
    return await Enrolment.create(data);
  }

  async getAllEnrolments() {
    return await Enrolment.findAll({ include: [Student, Course] });
  }

  async getEnrolmentById(id) {
    const enrolment = await Enrolment.findByPk(id, {
      include: [Student, Course],
    });
    if (!enrolment) {
      throw new AppError("Enrolment not found", 404);
    }
    return enrolment;
  }

  async updateEnrolment(id, data) {
    const enrolment = await Enrolment.findByPk(id);
    if (!enrolment) {
      throw new AppError("Enrolment not found", 404);
    }
    await enrolment.update(data);
    return enrolment;
  }

  async deleteEnrolment(id) {
    const enrolment = await Enrolment.findByPk(id);
    if (!enrolment) {
      throw new Error("Enrolment not found");
    }
    await enrolment.destroy();
    return { message: "Enrolment deleted successfully" };
  }
}

module.exports = new EnrolmentService();
