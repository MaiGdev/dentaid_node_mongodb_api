import { Request, Response } from "express";
import { RegisterScheduleDto } from "../../domain/dtos/schedule/register-schedule.dto";
import { ScheduleService } from "../services/schedule.service";
import { handleCustomError } from "../helpers/handleCustomError";

export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  registerSchedule = (req: Request, res: Response) => {
    const [error, registerScheduleDto] = RegisterScheduleDto.registerSchedule(
      req.body
    );

    if (error) return res.status(400).json({ error });

    this.scheduleService
      .registerSchedule(registerScheduleDto!)
      .then((schedule) => res.status(200).json(schedule))
      .catch((err) => handleCustomError(err, res));
  };
}
