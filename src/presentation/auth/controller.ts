import { Request, Response } from "express";

import { LoginUserDto, RegisterUserDto } from "../../domain/dtos";
import { handleCustomError } from "../helpers/handleCustomError";
import { AuthService } from "../services";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /*
  fullName
email
password
gender
identification
phoneNumber
emergencyPhoneNumber
address
birthdate
role
   */
  registerUser = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterUserDto.register(req.body);
    if (error) return res.status(400).json({ error });

    this.authService
      .registerUser(registerDto!)
      .then((user) => res.json(user))
      .catch((err) => handleCustomError(err, res));
  };

  login = (req: Request, res: Response) => {
    const [error, loginDto] = LoginUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    req.body.user = loginDto;

    this.authService
      .login(loginDto!)
      .then((user) => res.status(200).json(user))
      .catch((err) => handleCustomError(err, res));
  };

  renewToken = (req: Request, res: Response) => {
    console.log(req.body);
    /*     res.status(200).json("jshfaslj"); */

    this.authService
      .renewToken(req.body.token)
      .then((user) => res.status(200).json(user))
      .catch((err) => handleCustomError(err, res));
  };
}
