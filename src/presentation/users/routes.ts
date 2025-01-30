import { Router } from "express";
import { UserService } from "../services/user.service";
import { DentistController } from "./dentist/controller";
import { PatientController } from "./patient/controller";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const dentistController = new DentistController(userService);
    const patientController = new PatientController(userService);

    /* Dentists */
    router.post(
      "/dentist",
      /*    [AuthMiddleware.validateToken], */
      dentistController.register
    );
    router.get("/dentist", dentistController.getDentists);

    /* Patients */
    router.post("/patient", patientController.register);

    return router;
  }
}
