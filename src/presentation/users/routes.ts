import { Router } from "express";
import { DentistService } from "../services/dentist.service";
import { DentistController } from "./dentistController";
import { UserService } from "../services";
import { UserController } from "./userController";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const userController = new UserController(userService);
    const dentistService = new DentistService();
    const dentistController = new DentistController(dentistService);

    router.get("/availability/:dentistId", dentistController.getAvailableSlots);
    router.get("/", userController.getUsersByUserTypeFilter);

    return router;
  }
}
