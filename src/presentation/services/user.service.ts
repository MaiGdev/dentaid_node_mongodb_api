import mongoose from "mongoose";
import { DentistModel, PatientModel, UserModel } from "../../data/models";
import { CustomError } from "../../domain";
import {
  RegisterDentistDto,
  RegisterPatientDto,
  UpdateUserDto,
} from "../../domain/dtos";

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

  public async getUserByUserTypeId(id: string, userType: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID inválido");
    }

    try {
      switch (userType) {
        case "ADMIN_ROLE":
          const admin = await UserModel.findById(id);
          return {
            user: admin,
          };

        case "PATIENT_ROLE":
          const patient = await PatientModel.findOne({
            _id: id,
          }).populate("user");
          if (!patient) throw new Error("Paciente no encontrado");
          return patient;

        case "DENTIST_ROLE":
          const dentist = await DentistModel.findOne({
            _id: id,
          }).populate("user");
          if (!dentist) throw new Error("Dentista no encontrado");
          return dentist;

        default:
          return await UserModel.findById(id);
      }
    } catch (error) {
      throw new Error(`Error obteniendo usuario: ${error}`);
    }
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

  public async updateUser(id: string, updateUserDto: UpdateUserDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID inválido");
    }
    try {
      const user = await UserModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
      if (!user) throw CustomError.notFound("User not found");

      return {
        message: "User updated successfully",
        user,
      }
    } catch (error) {
      console.error(`Error updating user: ${error}`);
      throw error;
    }
  }
}
