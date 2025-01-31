import { Request, Response } from "express";

import {
  LoginUserDto,
  RegisterDentistDto,
  RegisterPatientDto,
  RegisterUserDto,
} from "../../domain/dtos";
import { handleCustomError } from "../helpers/handleCustomError";
import { AuthService } from "../services";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  registerUser = (req: Request, res: Response) => {
    if (req.body.role === "ADMIN_ROLE") {
      const [error, registerDto] = RegisterUserDto.register(req.body);
      if (error) return res.status(400).json({ error });

      this.authService
        .registerUser(registerDto!)
        .then((user) => res.json(user))
        .catch((err) => handleCustomError(err, res));
    }

    if (req.body.role === "DENTIST_ROLE") {
      const [error, registerDto] = RegisterUserDto.register(req.body);
      if (error) return res.status(400).json({ error });

      const [dentistError, registerDentistDto] = RegisterDentistDto.register(
        req.body
      );
      if (dentistError) return res.status(400).json({ dentistError });

      this.authService
        .registerUser(registerDto!, registerDentistDto!)
        .then((user) => res.json(user))
        .catch((err) => handleCustomError(err, res));
    }
    if (req.body.role === "PATIENT_ROLE") {
      const [error, registerDto] = RegisterUserDto.register(req.body);
      if (error) return res.status(400).json({ error });

      const [patientError, registerPatientDto] = RegisterPatientDto.register(
        req.body
      );
      if (patientError) return res.status(400).json({ patientError });

      this.authService
        .registerUser(registerDto!, undefined, registerPatientDto)
        .then((user) => res.json(user))
        .catch((err) => handleCustomError(err, res));
    }
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
    this.authService
      .renewToken(req.body.token)
      .then((user) => res.status(200).json(user))
      .catch((err) => handleCustomError(err, res));
  };
}
