const { Instructor } = require("../models");
const AppError = require("../utils/AppError");

class InstructorService {
  async createInstructor(data) {
    return await Instructor.create(data);
  }

  async getAllInstructors() {
    return await Instructor.findAll();
  }

  async getInstructorById(id) {
    const instructor = await Instructor.findByPk(id);
    if (!instructor) {
      throw new AppError("Instructor not found", 404);
    }
    return instructor;
  }

  async updateInstructor(id, data) {
    const instructor = await Instructor.findByPk(id);
    if (!instructor) {
      throw new AppError("Instructor not found", 404);
    }
    await instructor.update(data);
    return instructor;
  }

  async deleteInstructor(id) {
    const instructor = await Instructor.findByPk(id);
    if (!instructor) {
      throw new Error("Instructor not found");
    }
    await instructor.destroy();
    return { message: "Instructor deleted successfully" };
  }
}

module.exports = new InstructorService();
