import { Router } from "express";
import { ScheduleService } from "../services/schedule.service";
import { ScheduleController } from "./controller";

export class ScheduleRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new ScheduleService();
    const controller = new ScheduleController(service);

    router.post("/", controller.registerSchedule);
    router.put("/", controller.updateSchedule);
    router.get("/", controller.getScheduleByDentist);
    router.get("/availableSlots", controller.getAvailableSlots);

    return router;
  }
}
