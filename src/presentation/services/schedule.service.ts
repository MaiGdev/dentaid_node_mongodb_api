import { DentistScheduleModel } from "../../data";
import { RegisterScheduleDto } from "../../domain/dtos/schedule/register-schedule.dto";

export class ScheduleService {
  public async registerSchedule(registerScheduleDto: RegisterScheduleDto) {
    try {
      const savedSchedules = [];

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

  public async getScheduleByDentist(dentistId: string) {
    try {
      const schedule = await DentistScheduleModel.findOne({
        dentist: dentistId,
      });
      return schedule;
    } catch (error) {
      throw new Error(`Error getting schedule: ${error}`);
    }
  }
}
