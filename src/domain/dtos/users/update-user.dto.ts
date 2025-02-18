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

  static update(object: { [key: string]: any }): [string?, UpdateUserDto?] {
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

    const xDateOfBirth = new Date(dateOfBirth);

    const registerDto = new UpdateUserDto(
      fullName,
      gender,
      identification,
      phoneNumber,
      emergencyPhoneNumber,
      address,
      xDateOfBirth
    );
    return [undefined, registerDto];
  }
}
