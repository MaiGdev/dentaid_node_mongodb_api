import mongoose from "mongoose";
import { DentistModel, PatientModel, UserModel } from "../../data/models";
import { CustomError } from "../../domain";
import {
  RegisterDentistDto,
  RegisterPatientDto,
  UpdatePatientDto,
  UpdateUserDto,
} from "../../domain/dtos";
import { UpdateDentistDto } from "../../domain/dtos/users/dentist/update-dentist.dto";

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
      console.error(`Error getting users: ${error}`);
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
          let patient;
          patient = await PatientModel.findOne({
            _id: id,
          }).populate("user");
          if (!patient) {
            patient = await PatientModel.findOne({
              user: id,
            }).populate("user");
          }
          if (!patient) throw new Error("Paciente no encontrado");
          return patient;

        case "DENTIST_ROLE":
          let dentist;
          dentist = await DentistModel.findOne({
            _id: id,
          }).populate("user");

          if (!dentist) {
            dentist = await DentistModel.findOne({
              user: id,
            }).populate("user");
          }
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

  public async updateUser(
    id: string,
    userType: string,
    updateUserDto: UpdateUserDto
  ) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID inválido");
    }

    let currentUser: any;

    try {
      switch (userType) {
        case "ADMIN_ROLE":
          currentUser = await UserModel.findById(id);
          break;

        case "PATIENT_ROLE":
          currentUser = await PatientModel.findOne({ _id: id }).populate(
            "user"
          );
          /*    currentUser = patientData?.user; */
          break;

        case "DENTIST_ROLE":
          currentUser = await DentistModel.findOne({ _id: id }).populate(
            "user"
          );
          /*           currentUser = dentistData?.user; */
          break;

        default:
          currentUser = await UserModel.findById(id);
      }

      if (!currentUser) throw new Error("User not found");

      const changes: Partial<UpdateUserDto> = {};
      Object.entries(updateUserDto).forEach(([key, value]) => {
        const typedKey = key as keyof UpdateUserDto;
        if (value !== currentUser[typedKey]) {
          changes[typedKey] = value;
        }
      });

      if (Object.keys(changes).length === 0) {
        return {
          message: "No changes detected",
          user: currentUser,
        };
      }

      let updatedUser;

      if (currentUser) {
        if ("user" in currentUser) {
          updatedUser = await UserModel.findByIdAndUpdate(
            currentUser?.user.id,
            updateUserDto,
            {
              new: true,
              runValidators: true,
            }
          );
        } else {
          updatedUser = await UserModel.findByIdAndUpdate(id, updateUserDto, {
            new: true,
            runValidators: true,
          });
        }
      }

      if (!updatedUser) throw CustomError.notFound("User not updated");

      return {
        message: "User updated successfully",
        user: updatedUser,
      };
    } catch (error) {
      console.error(`Error updating user: ${error}`);
      throw error;
    }
  }

  public async updateDentist(id: string, updateDentistDto: UpdateDentistDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID inválido");
    }
    try {
      const user = await DentistModel.findByIdAndUpdate(id, updateDentistDto, {
        new: true,
      });
      if (!user) throw CustomError.notFound("Dentist not found");

      return {
        message: "Dentist updated successfully",
        user,
      };
    } catch (error) {
      console.error(`Error updating dentist: ${error}`);
      throw error;
    }
  }

  public async updatePatient(id: string, updatePatientDto: UpdatePatientDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID inválido");
    }
    try {
      const user = await PatientModel.findByIdAndUpdate(id, updatePatientDto, {
        new: true,
      });
      if (!user) throw CustomError.notFound("Patient not found");

      return {
        message: "Patient updated successfully",
        user,
      };
    } catch (error) {
      console.error(`Error updating patient: ${error}`);
      throw error;
    }
  }
}
