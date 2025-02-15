import { AppointmentModel } from "../../data";
import { RegisterAppointmentDto } from "../../domain/dtos/appointment/register.appointment.dto";

export class AppointmentService {
  public async registerAppointment(
    registerAppointmentDto: RegisterAppointmentDto
  ) {
    try {
      const appointment = new AppointmentModel(registerAppointmentDto);
      await appointment.save();

      return {
        message: "Appointment registered successfully",
        appointment,
      };
    } catch (error) {
      throw new Error(`Error registering schedule: ${error}`);
    }
  }

  public async getAppointments(status: string) {
    let appointments;
    try {
      if (status === "" || status === "undefined") {
        appointments = await AppointmentModel.find()
          .populate({
            path: "dentist",
            populate: { path: "user", model: "User" },
          })
          .populate({
            path: "patient",
            populate: { path: "user", model: "User" },
          });
      } else {
        appointments = await AppointmentModel.find({ status })
          .populate({
            path: "dentist",
            populate: { path: "user", model: "User" },
          })
          .populate({
            path: "patient",
            populate: { path: "user", model: "User" },
          });
      }
      return appointments;
    } catch (error) {
      throw new Error(`Error getting appointments: ${error}`);
    }
  }

  public async getPatientAppointment(patientId: string) {
    try {
      const appointments = await AppointmentModel.find({ patient: patientId });
      return appointments;
    } catch (error) {
      throw new Error(`Error getting appointments: ${error}`);
    }
  }
}
