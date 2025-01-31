export class RegisterPatientDto {
  constructor(
    public user: string,
    public bloodType: string,
    public knownAllergies: [],
    public medicalConditions: []
  ) {}

  static register(object: {
    [key: string]: any;
  }): [string?, RegisterPatientDto?] {
    const {
      user,
      bloodType,
      knownAllergies,
      medicalConditions,
    } = object;

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
        knownAllergies,
        medicalConditions
      ),
    ];
  }
}
