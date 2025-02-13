import { Router } from "express";
import { AppointmentService } from "../services/appointment.service";
import { AppontmentController } from "./controller";

export class AppointmentRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new AppointmentService();
    const controller = new AppontmentController(service);

    router.post("/", controller.registerAppointment);
    router.get("/", controller.getAppointments);
    router.get("/:id", controller.getPatientAppointment);

    return router;
  }
}
