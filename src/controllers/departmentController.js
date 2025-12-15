const departmentService = require("../services/departmentService");
const DepartmentDTO = require("../dtos/departmentDto");
const AppError = require("../utils/AppError");

class DepartmentController {
  async create(req, res, next) {
    try {
      const departmentData = DepartmentDTO.validate(req.body);
      const department = await departmentService.createDepartment(
        departmentData
      );
      res.status(201).json({
        success: true,
        data: new DepartmentDTO(department),
      });
    } catch (error) {
      if (error.message === "Invalid Department Name") {
        return next(new AppError(error.message, 400));
      }
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await departmentService.deleteDepartment(id);
      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      if (error.message === "Department not found") {
        return next(new AppError(error.message, 404));
      }
      next(error);
    }
  }

  async search(req, res, next) {
    try {
      const { name } = req.query;
      const departments = await departmentService.searchDepartments(name);
      res.status(200).json({
        success: true,
        data: departments.map((d) => new DepartmentDTO(d)),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DepartmentController();
