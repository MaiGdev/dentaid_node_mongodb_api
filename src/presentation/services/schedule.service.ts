import { AppointmentModel, DentistScheduleModel } from "../../data";
import { CustomError } from "../../domain";
import { RegisterScheduleDto } from "../../domain/dtos/schedule/register-schedule.dto";

export class ScheduleService {
  public async registerSchedule(registerScheduleDto: RegisterScheduleDto) {
    try {
      const savedSchedules = [];

      for (const scheduleEntity of registerScheduleDto.schedule) {
        const scheduleExist = await DentistScheduleModel.find({
          dentist: scheduleEntity.dentist,
        });

        if (scheduleExist) {
          throw CustomError.badRequest("Dentist already has a schedule");
        }

        const scheduleModel = new DentistScheduleModel({
          dentist: scheduleEntity.dentist,
          dayOfWeek: scheduleEntity.dayOfWeek,
          startTime: scheduleEntity.startTime,
          endTime: scheduleEntity.endTime,
          slotDuration: scheduleEntity.slotDuration,
          breaks: scheduleEntity.breaks,
          slots: scheduleEntity.slots,
        });
        const savedSchedule = await scheduleModel.save();
        savedSchedules.push(savedSchedule);
      }

      return {
        message: "Schedule registered successfully",
        schedules: savedSchedules,
      };
    } catch (error) {
      throw new Error(`Error registering schedule: ${error}`);
    }
  }

  public async getScheduleByDentist(dentistId: string) {
    try {
      const schedule = await DentistScheduleModel.find({
        dentist: dentistId,
      });
      return schedule;
    } catch (error) {
      throw new Error(`Error getting schedule: ${error}`);
    }
  }
  public async getAvailableSlots(
    dentistId: string,
    dayOfWeek: string,
    patientId?: string
  ) {
    try {
      // Obtener el horario del dentista para ese día de la semana
      const schedule = await DentistScheduleModel.findOne({
        dentist: dentistId,
        dayOfWeek,
      });

      if (!schedule) {
        return undefined;
      }

      let appointments;
      if (patientId) {
        appointments = await AppointmentModel.find({
          dentist: dentistId,
          patient: patientId,
        });
      } else {
        appointments = await AppointmentModel.find({
          dentist: dentistId,
          dayOfWeek: dayOfWeek,
        });
      }

      // Crear un conjunto de slots ocupados
      const occupiedSlots = new Set(appointments.map((app) => app.start));

      // Filtrar los slots disponibles
      const availableSlots = schedule.slots.filter(
        (slot) => !occupiedSlots.has(slot.start)
      );

      return availableSlots;
    } catch (error) {
      throw new Error(`Error getting available slots: ${error}`);
    }
  }
}
