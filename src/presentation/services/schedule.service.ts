import { DentistScheduleModel } from "../../data";
import { RegisterScheduleDto } from "../../domain/dtos/schedule/register-schedule.dto";

export class ScheduleService {
  public async registerSchedule(registerScheduleDto: RegisterScheduleDto) {
    try {
      const schedule = new DentistScheduleModel(registerScheduleDto);
      schedule.save();

      return {
        message: "Schedule registered successfully",
        schedule,
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
