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
          })
          .sort({ date: -1 });
      } else {
        appointments = await AppointmentModel.find({ status })
          .populate({
            path: "dentist",
            populate: { path: "user", model: "User" },
          })
          .populate({
            path: "patient",
            populate: { path: "user", model: "User" },
          })
          .sort({ date: -1 });
      }
      return appointments;
    } catch (error) {
      throw new Error(`Error getting appointments: ${error}`);
    }
  }

  public async getPatientAppointment(patientId: string, date: Date) {
    try {
      let query: any = { patient: patientId };

      if (!isNaN(date.getTime())) {
        query = { ...query, date };
      }

      const appointments = await AppointmentModel.find(query)
        .populate({
          path: "dentist",
          populate: { path: "user", model: "User" },
        })
        .populate({
          path: "patient",
          populate: { path: "user", model: "User" },
        })
        .sort({ date: -1 });

      return appointments;
    } catch (error) {
      throw new Error(`Error getting appointments: ${error}`);
    }
  }

  public async getDentistAppointment(dentistId: string, date: Date) {
    try {
      let query: any = { dentist: dentistId };

      if (!isNaN(date.getTime())) {
        query = { ...query, date };
      }

      const appointments = await AppointmentModel.find(query)
        .populate({
          path: "dentist",
          populate: { path: "user", model: "User" },
        })
        .populate({
          path: "patient",
          populate: { path: "user", model: "User" },
        })
        .sort({ date: -1 });

      return appointments;
    } catch (error) {
      throw new Error(`Error getting appointments: ${error}`);
    }
  }
}
