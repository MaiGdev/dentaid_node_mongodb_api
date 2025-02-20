import { Request, Response } from "express";
import { RegisterScheduleDto } from "../../domain/dtos/schedule/register-schedule.dto";
import { UpdateScheduleDto } from "../../domain/dtos/schedule/update-schedule.dto";
import { handleCustomError } from "../helpers/handleCustomError";
import { ScheduleService } from "../services/schedule.service";

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
  updateSchedule = (req: Request, res: Response) => {
    const [error, updateScheduleDto] = UpdateScheduleDto.updateSchedule(
      req.body
    );

    if (error) return res.status(400).json({ error });

    this.scheduleService
      .updateSchedule(updateScheduleDto!)
      .then((schedule) => res.status(200).json(schedule))
      .catch((err) => handleCustomError(err, res));
  };

  getScheduleByDentist = (req: Request, res: Response) => {
    const { dentistId } = req.query;
    if (!dentistId) return res.status(404).json("DentistId not provided");

    this.scheduleService
      .getScheduleByDentist(String(dentistId))
      .then((schedule) => res.status(200).json(schedule))
      .catch((err) => handleCustomError(err, res));
  };
  getAvailableSlots = (req: Request, res: Response) => {
    const dentistId = req.query.dentistId as string;
    const patientId = req.query.patientId as string;
    const dayOfWeek = req.query.dayOfWeek as string;

    if (!dentistId) return res.status(404).json("DentistId not provided");
    /*     if (!patientId) return res.status(404).json("patientId not provided"); */
    if (!dayOfWeek) return res.status(404).json("dayOfWeek not provided");

    this.scheduleService
      .getAvailableSlots(dentistId, dayOfWeek, patientId)
      .then((schedule) => res.status(200).json(schedule))
      .catch((err) => handleCustomError(err, res));
  };
}
