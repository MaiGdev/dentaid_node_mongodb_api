import { Router } from "express";
import { ScheduleService } from "../services/schedule.service";
import { ScheduleController } from "./controller";

export class ScheduleRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new ScheduleService();
    const controller = new ScheduleController(service);

    /* 
    GET    /api/appointments/patient/:patientId/upcoming  // upcoming patient appointments
    POST   /api/appointments/patient/book                 // booking
    POST   /api/availability/dentist/:dentistId/slots    
    */
    router.post("/", controller.registerSchedule);
    router.get("/", controller.getScheduleByDentist);

    return router;
  }
}
