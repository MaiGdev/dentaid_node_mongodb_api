import { Request, Response } from "express";
import { AppointmentService } from "../services/appointment.service";

export class AppontmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  getAvailableSlots = async (req: Request, res: Response) => {
    const { dentistId } = req.body;
    const { date } = req.query;

    if (!dentistId || !date)
      return res.status(400).json({ error: "Missing parameters" });

    const targetDate = new Date(date as string);

    try {
      const slots = await this.appointmentService.getAvailableSlots(
        dentistId,
        targetDate
      );
      return res.status(200).json(slots);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };


  

}
