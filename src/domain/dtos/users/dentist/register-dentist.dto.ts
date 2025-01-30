export class RegisterDentistDto {
  constructor(
    public user: string,
    public medicalLicenseNumber: string,
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
      university,
      workplace,
      yearsOfExperience,
    } = object;

    /*     const { id: user } = object.user; */

    const requiredFields = [
      "user",
      "medicalLicenseNumber",
      "university",
      "workplace",
      "yearsOfExperience",
    ];

/*     if (!user) return [`Missing user id`]; */

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
        university,
        workplace,
        yearsOfExperience
      ),
    ];
  }
}
