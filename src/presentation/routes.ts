import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { UserRoutes } from "./users/routes";
import { ScheduleRoutes } from "./schedule/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/user", UserRoutes.routes);
    router.use("/api/schedule", ScheduleRoutes.routes);
    router.use("/api/appointments", ScheduleRoutes.routes);

    return router;
  }
}
