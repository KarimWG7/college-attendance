const studentService = require("../services/studentService");
const StudentDTO = require("../dtos/studentDto");
const AppError = require("../utils/AppError");

class StudentController {
  async add(req, res, next) {
    try {
      const studentData = StudentDTO.validate(req.body);
      await studentService.createStudent(studentData);
      res.status(201).json({
        message: "Student added successfully",
      });
    } catch (error) {
      if (error.message === "Invalid Student Data") {
        return next(new AppError(error.message, 400));
      }
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const students = await studentService.getAllStudents();
      res.status(200).json(students.map((s) => new StudentDTO(s)));
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const student = await studentService.getStudentById(id);
      res.status(200).json(new StudentDTO(student));
    } catch (error) {
      if (error.message === "Student not found") {
        return next(new AppError(error.message, 404));
      }
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = {};
      if (req.body.firstName) updateData.FirstName = req.body.firstName;
      if (req.body.lastName) updateData.LastName = req.body.lastName;
      if (req.body.gmail) updateData.Email = req.body.gmail; // Note: Student model has Email, format.json uses gmail in body but maybe maps to Email?
      // format.json for Student add: "gmail": "ali@gmail.com".
      // Student model has "Email".
      // I should map gmail to Email.
      if (req.body.departmentID)
        updateData.DepartmentID = req.body.departmentID;
      if (req.body.nfc_Tag) updateData.NFC_Tag = req.body.nfc_Tag;
      if (req.body.level) updateData.Level = req.body.level;

      await studentService.updateStudent(id, updateData);
      res.status(200).json({
        message: "Student updated successfully",
      });
    } catch (error) {
      if (error.message === "Student not found") {
        return next(new AppError(error.message, 404));
      }
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await studentService.deleteStudent(id);
      res.status(200).json({
        message: "Student deleted successfully",
      });
    } catch (error) {
      if (error.message === "Student not found") {
        error.statusCode = 404;
      }
      next(error);
    }
  }

  async getByLevel(req, res, next) {
    try {
      const { level } = req.params;
      const students = await studentService.getStudentsByLevel(level);
      res.status(200).json(students.map((s) => new StudentDTO(s)));
    } catch (error) {
      next(error);
    }
  }

  async getByDepartment(req, res, next) {
    try {
      const { departmentId } = req.params;
      const students = await studentService.getStudentsByDepartment(
        departmentId
      );
      res.status(200).json(students.map((s) => new StudentDTO(s)));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StudentController();
