const lectureService = require("../services/lectureService");
const LectureDTO = require("../dtos/lectureDto");
const AppError = require("../utils/AppError");

class LectureController {
  async add(req, res, next) {
    try {
      const { courseId, startTime, endTime, room, date, code, state } =
        req.body;

      const mappedData = {
        courseId,
        startTime,
        endTime,
        room,
        date,
        code,
        state,
      };

      const validatedData = LectureDTO.validate(mappedData);
      await lectureService.createLecture(validatedData);

      res.status(201).json({
        message: "Lecture added successfully",
      });
    } catch (error) {
      if (error.message === "Invalid Lecture Data") {
        return next(new AppError(error.message, 400));
      }
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const lectures = await lectureService.getAllLectures();
      res.status(200).json(lectures.map((l) => new LectureDTO(l)));
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const lecture = await lectureService.getLectureById(id);
      res.status(200).json(new LectureDTO(lecture));
    } catch (error) {
      if (error.message === "Lecture not found") {
        return next(new AppError(error.message, 404));
      }
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = {};
      if (req.body.courseId) updateData.CourseID = req.body.courseId;
      if (req.body.startTime) updateData.StartTime = req.body.startTime;
      if (req.body.endTime) updateData.EndTime = req.body.endTime;
      if (req.body.room) updateData.Room = req.body.room;
      if (req.body.date) updateData.Date = req.body.date;
      if (req.body.code) updateData.Code = req.body.code;
      if (req.body.state) updateData.State = req.body.state;

      await lectureService.updateLecture(id, updateData);
      res.status(200).json({
        message: "Lecture updated successfully",
      });
    } catch (error) {
      if (error.message === "Lecture not found") {
        return next(new AppError(error.message, 404));
      }
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await lectureService.deleteLecture(id);
      res.status(200).json({
        message: "Lecture deleted successfully",
      });
    } catch (error) {
      if (error.message === "Lecture not found") {
        return next(new AppError(error.message, 404));
      }
      next(error);
    }
  }
}

module.exports = new LectureController();
