import { bcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data/models";
import { LoginUserDto, RegisterUserDto } from "../../domain/dtos";
import { CustomError } from "../../domain/errors/custom.error";

export class AuthService {
  public async registerUser(registerUserDto: RegisterUserDto) {
    const existingUser = await UserModel.findOne({
      $or: [
        { email: registerUserDto.email },
        { identification: registerUserDto.identification },
        { phoneNumber: registerUserDto.phoneNumber },
        { emergencyPhoneNumber: registerUserDto.emergencyPhoneNumber },
      ],
    });

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

    try {
      const newUser = new UserModel(registerUserDto);

      newUser.password = bcryptAdapter.hash(newUser.password);

      await newUser.save();

      const token = await JwtAdapter.generateToken({
        id: newUser.id,
        email: newUser.email,
      });
      if (!token) throw CustomError.internalServer("Error while creating JWT");

      return {
        user: newUser,
        token,
      };
    } catch (error) {
      console.error(`Error creating user: ${error}`);
      throw error;
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
      });
      if (!token) throw CustomError.internalServer("Error while creating JWT");

      return {
        existingUser,
        token,
      };
    } catch (error) {
      console.error(`Error creating user: ${error}`);
      throw error;
    }
  }

  public async renewToken(token: any) {
    const { id, email } = await JwtAdapter.verifyToken(token);

    const newToken = await JwtAdapter.generateToken({
      id,
      email,
    });
    return {
      token: newToken,
      id,
      email,
    };
  }
}
