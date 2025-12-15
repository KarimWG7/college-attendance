const AppError = require("../utils/AppError");
class LectureDTO {
  constructor(data) {
    this.id = data.ID;
    this.courseId = data.CourseID || data.courseID; // Handle both just in case
    this.startTime = data.StartTime || data.startTime;
    this.endTime = data.EndTime || data.endTime;
    this.room = data.Room || data.room;
    this.date = data.Date;
    this.code = data.Code;
    this.state = data.State;
  }

  static validate(data) {
    if (!data.courseId || !data.startTime || !data.endTime || !data.room) {
      console.log(data);
      throw new AppError("Missing required fields", 400);
    }
    return {
      CourseID: data.courseId,
      StartTime: data.startTime,
      EndTime: data.endTime,
      Room: data.room,
      Date: data.date,
      Code: data.code,
      State: data.state,
    };
  }
}

module.exports = LectureDTO;
