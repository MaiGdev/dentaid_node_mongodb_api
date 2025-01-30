import { Request, Response } from "express";
import { CustomError } from "../../../domain";
import { RegisterPatientDto } from "../../../domain/dtos/users/patient/register-patient.dto";
import { handleCustomError } from "../../helpers/handleCustomError";
import { UserService } from "../../services";

export class PatientController {
  constructor(private readonly userService: UserService) {}

  handleError = (err: unknown, res: Response) => {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    res.status(500).json({ message: "Internal server error", error: { err } });
  };

  register = (req: Request, res: Response) => {
    const [error, registerPatientDto] = RegisterPatientDto.register(req.body);

    if (error) return res.status(400).json({ error });

    this.userService
      .registerPatient(registerPatientDto!)
      .then((patient) => res.status(200).json(patient))
      .catch((err) => handleCustomError(err, res));
  };
}
