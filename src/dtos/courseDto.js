class CourseDTO {
  constructor(data) {
    this.id = data.ID;
    this.name = data.Name;
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
    };
  }
}

module.exports = CourseDTO;
