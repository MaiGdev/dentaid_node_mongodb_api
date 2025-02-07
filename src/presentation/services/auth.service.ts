import mongoose from "mongoose";
import { bcryptAdapter, JwtAdapter } from "../../config";
import { DentistModel, PatientModel, UserModel } from "../../data/models";
import {
  LoginUserDto,
  RegisterDentistDto,
  RegisterPatientDto,
  RegisterUserDto,
} from "../../domain/dtos";
import { CustomError } from "../../domain/errors/custom.error";

export class AuthService {
  public async registerUser(
    registerUserDto: RegisterUserDto,
    registerDentistDto?: RegisterDentistDto,
    registerPatientDto?: RegisterPatientDto
  ) {
    const session = await mongoose.startSession();

    let userData;
    try {
      session.startTransaction();
      const existingUser = await UserModel.findOne({
        $or: [
          { email: registerUserDto.email },
          { identification: registerUserDto.identification },
          { phoneNumber: registerUserDto.phoneNumber },
          { emergencyPhoneNumber: registerUserDto.emergencyPhoneNumber },
        ],
      }).session(session);

      if (existingUser) {
        if (existingUser.email === registerUserDto.email) {
          throw CustomError.badRequest("Email already exists");
        }
        if (existingUser.identification === registerUserDto.identification) {
          throw CustomError.badRequest("Identification already exists");
        }
        if (existingUser.phoneNumber === registerUserDto.phoneNumber) {
          throw CustomError.badRequest("Phone number already exists");
        }
        if (
          existingUser.emergencyPhoneNumber ===
          registerUserDto.emergencyPhoneNumber
        ) {
          throw CustomError.badRequest("Emergency phone number already exists");
        }
      }
      const newUser = new UserModel(registerUserDto);
      newUser.password = bcryptAdapter.hash(newUser.password);

      await newUser.save({ session });

      userData = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.fullName,
        role: newUser.role[0],
      };

      if (registerDentistDto) {
        const newDentist = new DentistModel(registerDentistDto);
        newDentist.user = newUser._id;
        await newDentist.save({ session });
        userData = { ...userData, dentistId: newDentist._id };
      }
      if (registerPatientDto) {
        const newPatient = new PatientModel(registerPatientDto);
        newPatient.user = newUser._id;
        await newPatient.save({ session });
        userData = { ...userData, patientId: newPatient._id };
      }

      await session.commitTransaction();

      const token = await JwtAdapter.generateToken(userData);

      return { user: userData, token };
    } catch (error) {
      await session.abortTransaction();
      console.error(`Error creating user: ${error}`);
      throw error;
    } finally {
      session.endSession();
    }
  }

  public async login(loginUserDto: LoginUserDto) {
    const existingUser = await UserModel.findOne({
      email: loginUserDto.email,
    });

    if (!existingUser) throw CustomError.badRequest("User not exist");

    try {
      const isMaching = bcryptAdapter.compare(
        loginUserDto.password,
        existingUser.password
      );

      if (!isMaching) throw CustomError.badRequest("Password incorrect");

      const token = await JwtAdapter.generateToken({
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.fullName,
        role: existingUser.role[0],
      });
      if (!token) throw CustomError.internalServer("Error while creating JWT");

      return {
        user: {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.fullName,
          role: existingUser.role[0],
        },
        token,
      };
    } catch (error) {
      console.error(`Error creating user: ${error}`);
      throw error;
    }
  }

  public async renewToken(token: any) {
    const { id, email, name, role } = await JwtAdapter.verifyToken(token);

    const newToken = await JwtAdapter.generateToken({
      id,
      email,
      name,
      role,
    });
    return {
      token: newToken,
      user: {
        id,
        email,
        name,
        role,
      },
    };
  }
}
