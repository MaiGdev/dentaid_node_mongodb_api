import { AppointmentModel, DentistScheduleModel } from "../../data";
import { CustomError } from "../../domain";
import { RegisterScheduleDto } from "../../domain/dtos/schedule/register-schedule.dto";
import { UpdateScheduleDto } from "../../domain/dtos/schedule/update-schedule.dto";

export class ScheduleService {
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
      const occupiedSlots = new Set(appointments.map((app) => app.start));

      const availableSlots = schedule.slots.filter(
        (slot) => !occupiedSlots.has(slot.start)
      );

      return availableSlots;
    } catch (error) {
      throw new Error(`Error getting available slots: ${error}`);
    }
  }

  public async registerSchedule(registerScheduleDto: RegisterScheduleDto) {
    try {
      const savedSchedules = [];
      const scheduleExist = await DentistScheduleModel.find({
        dentist: registerScheduleDto.dentist,
      });

      if (scheduleExist && scheduleExist.length > 0) {
        throw CustomError.badRequest("Dentist already has a schedule");
      }
      for (const scheduleEntity of registerScheduleDto.schedule) {

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

  public async updateSchedule(updateScheduleDto: UpdateScheduleDto) {
    try {
      const { dentist, schedule } = updateScheduleDto;

      const existingSchedules = await DentistScheduleModel.find({
        dentist: dentist,
      });

      if (!existingSchedules || existingSchedules.length === 0) {
        throw CustomError.badRequest("Dentist doesn't have a schedule");
      }
      const existingDays = new Set(
        existingSchedules.map((day) => day.dayOfWeek)
      );

      const updatedSchedules = [];
      const newSchedules = [];

      for (const scheduleEntity of schedule) {
        if (existingDays.has(scheduleEntity.dayOfWeek)) {
          const updatedSchedule = await DentistScheduleModel.updateMany(
            {
              dentist: dentist,
              dayOfWeek: scheduleEntity.dayOfWeek,
            },
            {
              $set: {
                startTime: scheduleEntity.startTime,
                endTime: scheduleEntity.endTime,
                slotDuration: scheduleEntity.slotDuration,
                breaks: scheduleEntity.breaks,
                slots: scheduleEntity.slots,
              },
            }
          );
          updatedSchedules.push(updatedSchedule);
        } else {
          newSchedules.push(scheduleEntity);
        }
      }

      for (const newDay of newSchedules) {
        const scheduleModel = new DentistScheduleModel({
          dentist: dentist,
          dayOfWeek: newDay.dayOfWeek,
          startTime: newDay.startTime,
          endTime: newDay.endTime,
          slotDuration: newDay.slotDuration,
          breaks: newDay.breaks,
          slots: newDay.slots,
        });
        await scheduleModel.save();
      }

      return {
        message: "Schedule updated successfully",
        updatedSchedules: updatedSchedules,
        newSchedules: newSchedules,
      };
    } catch (error) {
      throw new Error(`Error updating schedule: ${error}`);
    }
  }
}
