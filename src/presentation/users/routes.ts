import { Router } from "express";
import { UserService } from "../services";
import { UserController } from "./userController";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const userController = new UserController(userService);

    router.get("/", userController.getUsersByUserTypeFilter);
    router.get("/getUser", userController.getUserByUserTypeId);
    router.put("/", userController.updateUser);
    router.put("/dentist", userController.updateDentist);
    router.put("/patient", userController.updatePatient);

    return router;
  }
}
