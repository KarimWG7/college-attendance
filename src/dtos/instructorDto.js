class InstructorDTO {
  constructor(data) {
    this.id = data.ID;
    this.firstName = data.FirstName;
    this.lastName = data.LastName;
    this.gmail = data.Gmail;
  }

  static validate(data) {
    if (!data.firstName || !data.lastName || !data.gmail) {
      throw new Error("Missing required fields");
    }
    return {
      FirstName: data.firstName,
      LastName: data.lastName,
      Gmail: data.gmail,
    };
  }
}

module.exports = InstructorDTO;
