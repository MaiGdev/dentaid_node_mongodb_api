export class UpdatePatientDto {
  constructor(
    public bloodType: string,
    public knownAllergies: [],
    public medicalConditions: []
  ) {}

  static update(object: {
    [key: string]: any;
  }): [string?, UpdatePatientDto?] {
    const { bloodType, knownAllergies, medicalConditions } = object;

    return [
      undefined,
      new UpdatePatientDto(bloodType, knownAllergies, medicalConditions),
    ];
  }
}
