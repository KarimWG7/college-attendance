class EnrolmentDTO {
  constructor(data) {
    this.id = data.ID;
    this.studentId = data.StudentID;
    this.courseId = data.CourseID;
  }

  static validate(data) {
    if (!data.studentId || !data.courseId) {
      throw new Error("Missing required fields");
    }
    return {
      StudentID: data.studentId,
      CourseID: data.courseId,
    };
  }
}

module.exports = EnrolmentDTO;
