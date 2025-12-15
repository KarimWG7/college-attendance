class CourseDTO {
  constructor(data) {
    this.id = data.ID;
    this.name = data.Name;
    this.instructorID = data.InstructorID;
    this.level = data.Level;
    this.code = data.Code;
  }

  static validate(data) {
    if (
      !data.name ||
      typeof data.name !== "string" ||
      data.name.trim() === ""
    ) {
      throw new Error("Invalid Course Name");
    }
    return {
      Name: data.name.trim(),
      Code: data.code.trim(),
      Level: data.level,
      InstructorID: data.instructorID,
    };
  }
}

module.exports = CourseDTO;
