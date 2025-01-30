import { Request, Response } from "express";

import { LoginUserDto, RegisterUserDto } from "../../domain/dtos";
import { handleCustomError } from "../helpers/handleCustomError";
import { AuthService } from "../services";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
