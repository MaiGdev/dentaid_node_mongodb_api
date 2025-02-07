export class RegisterDentistDto {
  constructor(
    public user: string,
    public medicalLicenseNumber: string,
    public speciality: [],
    public university: string,
    public workplace: string,
    public yearsOfExperience: string
  ) {}

  static register(object: {
    [key: string]: any;
  }): [string?, RegisterDentistDto?] {
    const {
      user,
      medicalLicenseNumber,
      speciality,
      university,
      workplace,
      yearsOfExperience,
    } = object;

    const requiredFields = [
      "user",
      "medicalLicenseNumber",
      "speciality",
      "university",
      "workplace",
      "yearsOfExperience",
    ];

    requiredFields.map((field) => {
      if (!object[field]) {
        return [`Missing ${field}`];
      }
    });

    return [
      undefined,
      new RegisterDentistDto(
        user,
        medicalLicenseNumber,
        speciality,
        university,
        workplace,
        yearsOfExperience
      ),
    ];
  }
}
