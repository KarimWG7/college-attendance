class AttendanceDTO {
  constructor(data) {
    this.id = data.ID;
    this.studentId = data.StudentID;
    this.lectureId = data.LectureID;
    this.scanTime = data.ScanTime;
    this.status = data.Status;
  }

  static validate(data) {
    if (!data.studentId || !data.lectureId || !data.status) {
      throw new Error("Missing required fields");
    }
    return {
      StudentID: data.studentId,
      LectureID: data.lectureId,
      ScanTime: data.scanTime || new Date(),
      Status: data.status,
    };
  }
}

module.exports = AttendanceDTO;
