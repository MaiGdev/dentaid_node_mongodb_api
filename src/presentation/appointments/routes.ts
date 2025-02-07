import { Router } from "express";

export class AppointmentRoutes {
  static get routes(): Router {
    const router = Router();



/*     router.get("/availability/:dentistId", dentistController.getAvailableSlots); */

    return router;
  }
}
