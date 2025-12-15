const instructorService = require("../services/instructorService");
const InstructorDTO = require("../dtos/instructorDto");
const AppError = require("../utils/AppError");

class InstructorController {
  async add(req, res, next) {
    try {
      const instructorData = InstructorDTO.validate(req.body);
      await instructorService.createInstructor(instructorData);
      res.status(201).send();
    } catch (error) {
      if (error.message === "Invalid Instructor Data") {
        return next(new AppError(error.message, 400));
      }
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const instructors = await instructorService.getAllInstructors();
      res.status(200).json(instructors.map((i) => new InstructorDTO(i)));
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const instructor = await instructorService.getInstructorById(id);
      res.status(200).json(new InstructorDTO(instructor));
    } catch (error) {
      if (error.message === "Instructor not found") {
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
      if (req.body.gmail) updateData.Gmail = req.body.gmail;

      await instructorService.updateInstructor(id, updateData);
      res.status(200).send();
    } catch (error) {
      if (error.message === "Instructor not found") {
        return next(new AppError(error.message, 404));
      }
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await instructorService.deleteInstructor(id);
      res.status(200).json({
        message: "Instructor deleted successfully",
      });
    } catch (error) {
      if (error.message === "Instructor not found") {
        return next(new AppError(error.message, 404));
      }
      next(error);
    }
  }
}

module.exports = new InstructorController();
