import { Request, Response } from "express";
import { RegisterDentistDto } from "../../../domain/dtos";
import { handleCustomError } from "../../helpers/handleCustomError";
import { UserService } from "../../services";

export class DentistController {
  constructor(private readonly userService: UserService) {}

  register = (req: Request, res: Response) => {
    const [error, registerDentistDto] = RegisterDentistDto.register(req.body);

    if (error) return res.status(400).json({ error });

    this.userService
      .registerDentist(registerDentistDto!)
      .then((dentist) => {
        res.status(200).json(dentist);
      })
      .catch((err) => {
        handleCustomError(err, res);
      });
  };

  getDentists = (req: Request, res: Response) => {
    this.userService
      .getDentists()
      .then((dentist) => {
        res.status(200).json(dentist);
      })
      .catch((err) => {
        handleCustomError(err, res);
      });
  };
}
