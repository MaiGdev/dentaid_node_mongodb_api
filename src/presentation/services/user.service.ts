import { DentistModel, PatientModel, UserModel } from "../../data/models";
import { CustomError } from "../../domain";
import { RegisterDentistDto, RegisterPatientDto } from "../../domain/dtos";

export class UserService {
  public async getUsersByUserType(userType: string) {
    try {
      switch (userType) {
        case "ADMIN_ROLE":
          return await UserModel.find({
            role: "ADMIN_ROLE",
          });
        case "PATIENT_ROLE":
          return await PatientModel.find().populate("user");
        case "DENTIST_ROLE":
          return await DentistModel.find().populate("user");
        default:
          return await UserModel.find();
      }
    } catch (error) {
      console.error(`Error registering dentist: ${error}`);
      throw error;
    }
  }

  public async getDentists() {
    const dentists = await DentistModel.find();
    return dentists;
  }

  public async registerDentist(registerDentistDto: RegisterDentistDto) {
    const { user, medicalLicenseNumber } = registerDentistDto;

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

  public async registerPatient(registerPatientDto: RegisterPatientDto) {
    const { bloodType, knownAllergies, medicalConditions, user } =
      registerPatientDto;

    const patientExist = await PatientModel.findOne({ id: user });

    if (patientExist) throw CustomError.badRequest("Dentist already exist");

    try {
      const modelPatient = new PatientModel(registerPatientDto!);
      const newPatient = await modelPatient.save();

      return {
        message: "Patient registered successfully",
        patient: newPatient,
      };
    } catch (error) {
      console.error(`Error registering patient: ${error}`);
      throw error;
    }
  }
}
