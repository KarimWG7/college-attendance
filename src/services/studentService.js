const { Student, Department } = require("../models");
const AppError = require("../utils/AppError");

class StudentService {
  async createStudent(data) {
    return await Student.create(data);
  }

  async getAllStudents() {
    return await Student.findAll({ include: Department });
  }

  async getStudentById(id) {
    const student = await Student.findByPk(id, { include: Department });
    if (!student) {
      throw new AppError("Student not found", 404);
    }
    return student;
  }

  async updateStudent(id, data) {
    const student = await Student.findByPk(id);
    if (!student) {
      throw new AppError("Student not found", 404);
    }
    await student.update(data);
    return student;
  }

  async getStudentsByLevel(level) {
    return await Student.findAll({
      where: { Level: level },
      include: [Department],
    });
  }

  async getStudentsByDepartment(departmentId) {
    return await Student.findAll({
      where: { DepartmentID: departmentId },
      include: [Department],
    });
  }

  async deleteStudent(id) {
    const student = await Student.findByPk(id);
    if (!student) {
      throw new AppError("Student not found", 404);
    }
    await student.destroy();
    return { message: "Student deleted successfully" };
  }
}

module.exports = new StudentService();
