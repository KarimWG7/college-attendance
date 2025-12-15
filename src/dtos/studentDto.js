class StudentDTO {
  constructor(data) {
    this.id = data.ID;
    this.firstName = data.FirstName;
    this.lastName = data.LastName;
    this.email = data.Email;
    this.nfcTag = data.NFC_Tag;
    this.level = data.Level;
  }

  static validate(data) {
    if (
      !data.firstName ||
      !data.lastName ||
      !data.gmail || // format.json uses gmail
      !data.departmentID // format.json uses departmentID
    ) {
      throw new Error("Missing required fields");
    }
    return {
      FirstName: data.firstName,
      LastName: data.lastName,
      Email: data.gmail, // Map gmail to Email
      Password: data.password,
      DepartmentID: data.departmentID,
      NFC_Tag: data.nfc_Tag,
      Level: data.level,
    };
  }
}

module.exports = StudentDTO;
