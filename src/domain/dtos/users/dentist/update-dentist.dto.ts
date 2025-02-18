export class UpdateDentistDto {
  constructor(
    public medicalLicenseNumber: string,
    public speciality: [],
    public university: string,
    public workplace: string,
    public yearsOfExperience: string
  ) {}

  static update(object: {
    [key: string]: any;
  }): [string?, UpdateDentistDto?] {
    const {
      medicalLicenseNumber,
      speciality,
      university,
      workplace,
      yearsOfExperience,
    } = object;

    return [
      undefined,
      new UpdateDentistDto(
        medicalLicenseNumber,
        speciality,
        university,
        workplace,
        yearsOfExperience
      ),
    ];
  }
}
