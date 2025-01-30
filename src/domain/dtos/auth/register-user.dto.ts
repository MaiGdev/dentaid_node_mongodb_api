import { MomentAdapter } from "../../../config/";

export class RegisterUserDto {
  constructor(
    public fullName: string,
    public email: string,
    public password: string,
    public gender: string,
    public identification: string,
    public phoneNumber: string,
    public emergencyPhoneNumber: string,
    public address: string,
    public birthdate: Date,
    public role: string
  ) {}

  static register(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const {
      fullName,
      email,
      password,
      gender,
      identification,
      phoneNumber,
      emergencyPhoneNumber,
      address,
      birthdate,
      role,
    } = object;

    const requiredFields = [
      "fullName",
      "email",
      "password",
      "gender",
      "identification",
      "phoneNumber",
      "emergencyPhoneNumber",
      "address",
      "birthdate",
    ];

    requiredFields.map((field) => {
      if (!object[field]) {
        return [`Missing ${field}`];
      }
    });

    if (!MomentAdapter.isValid(birthdate)) return ["Date format incorrect"];

    const registerDto = new RegisterUserDto(
      fullName,
      email,
      password,
      gender,
      identification,
      phoneNumber,
      emergencyPhoneNumber,
      address,
      birthdate,
      role
    );
    return [undefined, registerDto];
  }
}
