import { regularExps } from "../../../config";


export class LoginUserDto {
  constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    const requiredFields = ["email", "password"];

    requiredFields.map((field) => {
      if (!object[field]) {
        return [`Missing ${field}`];
      }
    });
    if (!regularExps.email.test(email)) return ["Email is not valid"];

    const registerDto = new LoginUserDto(email, password);
    return [undefined, registerDto];
  }
}
