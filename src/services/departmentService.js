const { Department } = require("../models");
const { Op } = require("sequelize");
const AppError = require("../utils/AppError");

class DepartmentService {
  async createDepartment(data) {
    return await Department.create(data);
  }

  async deleteDepartment(id) {
    const department = await Department.findByPk(id);
    if (!department) {
      throw new AppError("Department not found", 404);
    }
    await department.destroy();
    return { message: "Department deleted successfully" };
  }

  async searchDepartments(query) {
    if (!query) {
      return await Department.findAll();
    }
    return await Department.findAll({
      where: {
        Name: {
          [Op.like]: `%${query}%`,
        },
      },
    });
  }

  async getAllDepartments() {
    return await Department.findAll();
  }
}

module.exports = new DepartmentService();
