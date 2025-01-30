import { DentistModel, PatientModel } from "../../data/models";
import { CustomError } from "../../domain";
import { RegisterDentistDto, RegisterPatientDto } from "../../domain/dtos";

export class UserService {
  public async registerDentist(registerDentistDto: RegisterDentistDto) {
    const {
      user,
      medicalLicenseNumber,
      university,
      workplace,
      yearsOfExperience,
    } = registerDentistDto;

    const dentistExist = await DentistModel.findOne({
      $or: [{ medicalLicenseNumber: medicalLicenseNumber }, { id: user }],
    });

    if (dentistExist) throw CustomError.badRequest("Dentist already exist");

    try {
      const modelDentist = new DentistModel(registerDentistDto);
      const newDentist = await modelDentist.save();

      return {
        message: "Dentist registered successfully",
        dentist: newDentist,
      };
    } catch (error) {
      console.error(`Error registering dentist: ${error}`);
      throw error;
    }
  }

  public async getDentists() {
    const dentists = await DentistModel.find();
    return dentists;
  }

  public async registerPatient(registerPatientDto: RegisterPatientDto) {
    const { bloodType, genre, knownAllergies, medicalConditions, user } =
      registerPatientDto;

    const patientExist = await PatientModel.findOne({ id: user });

    if (patientExist) throw CustomError.badRequest("Dentist already exist");

    try {
      const modelPatient = new PatientModel(registerPatientDto!);
      const newPatient = await modelPatient.save();

      return {
        message: "Patient registered successfully",
        patient: newPatient,
      }
    } catch (error) {
      console.error(`Error registering patient: ${error}`);
      throw error;
    }
  }
}
