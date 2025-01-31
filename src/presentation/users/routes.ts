import { Router } from "express";
import { UserService } from "../services/user.service";


export class UserRoutes {
  static get routes(): Router {
    const router = Router();

/*     const userService = new UserService();
    const dentistController = new DentistController(userService);
    const patientController = new PatientController(userService);

    router.post("/dentist", dentistController.register);
    router.get("/dentist", dentistController.getDentists);


    router.post("/patient", patientController.register); */

    return router;
  }
}
