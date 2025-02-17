import { MomentAdapter } from "../../../config";

export class UpdateUserDto {
  constructor(
    public fullName?: string,
    public gender?: string,
    public identification?: string,
    public phoneNumber?: string,
    public emergencyPhoneNumber?: string,
    public address?: string,
    public dateOfBirth?: Date
  ) {}

  static register(object: { [key: string]: any }): [string?, UpdateUserDto?] {
    const {
      fullName,
      gender,
      identification,
      phoneNumber,
      emergencyPhoneNumber,
      address,
      dateOfBirth,
    } = object;

    if (dateOfBirth) {
      if (!MomentAdapter.isValid(dateOfBirth)) return ["Date format incorrect"];
    }

    const registerDto = new UpdateUserDto(
      fullName,
      gender,
      identification,
      phoneNumber,
      emergencyPhoneNumber,
      address,
      dateOfBirth
    );
    return [undefined, registerDto];
  }
}
