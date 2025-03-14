import { Request, Response } from "express";
import { RegisterAppointmentDto } from "../../domain/dtos/appointment/register.appointment.dto";
import { AppointmentService } from "../services/appointment.service";

export class AppontmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  registerAppointment = async (req: Request, res: Response) => {
    const [error, registerAppointmentDto] =
      RegisterAppointmentDto.registerAppointment(req.body);

    if (error) return res.status(400).json({ error });

    try {
      const appointment = await this.appointmentService.registerAppointment(
        registerAppointmentDto!
      );

      return res.status(200).json(appointment);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };
  getAppointments = async (req: Request, res: Response) => {
    const { status } = req.query;
    try {
      const appointment = await this.appointmentService.getAppointments(
        String(status)
      );

      return res.status(200).json(appointment);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };
  getPatientAppointment = async (req: Request, res: Response) => {
    console.log("getPatientAppointment");
    const { id } = req.params;
    const { date } = req.body;

    if (!id) return res.status(400).json("ID not provided");

    try {
      const formattedDate = new Date(date);
      const appointment = await this.appointmentService.getPatientAppointment(
        id,
        formattedDate
      );

      if (appointment.length == 0)
        return res
          .status(400)
          .json({ error: "There's no appointments registered" });

      return res.status(200).json(appointment);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };
  getDentistAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { date } = req.body;

    if (!id) return res.status(400).json("ID not provided");

    try {
      const formattedDate = new Date(date);
      const appointment = await this.appointmentService.getDentistAppointment(
        id,
        formattedDate
      );

      if (appointment.length == 0)
        return res
          .status(400)
          .json({ error: "There's no appointments registered" });

      return res.status(200).json(appointment);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };
}
