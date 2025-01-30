export class RegisterPatientDto {
  constructor(
    public user: string,
    public bloodType: string,
    public genre: string,
    public knownAllergies: [],
    public medicalConditions: []
  ) {}

  static register(object: {
    [key: string]: any;
  }): [string?, RegisterPatientDto?] {
    const {
      user,
      bloodType,
      genre,
      knownAllergies,
      medicalConditions,
    } = object;

    /*     const { id: user } = object.user; */

    const requiredFields = [
      "user",
      "bloodType",
      "genre",
      "knownAllergies",
      "medicalConditions",
    ];

    requiredFields.map((field) => {
      if (!object[field]) {
        return [`Missing ${field}`];
      }
    });

    return [
      undefined,
      new RegisterPatientDto(
        user,
        bloodType,
        genre,
        knownAllergies,
        medicalConditions
      ),
    ];
  }
}
