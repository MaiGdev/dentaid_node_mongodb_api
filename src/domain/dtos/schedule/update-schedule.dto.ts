import { ScheduleEntity } from "../../entities/schedule.entity";

export class UpdateScheduleDto {
  constructor(
    public readonly dentist: string,
    public readonly schedule: ScheduleEntity[]
  ) {}

  static updateSchedule(object: {
    dentist: string;
    schedule: any[];
  }): [string?, UpdateScheduleDto?] {
    if (!object?.dentist) {
      return ["Invalid input format"];
    }

    try {
      const schedule = object.schedule.map(
        (day) =>
          new ScheduleEntity(
            object.dentist,
            day.dayOfWeek,
            day.startTime,
            day.endTime,
            day.slotDuration,
            day.breaks,
            day.slots
          )
      );
      /*  const scheduleArray = Object.entries(object.schedule).map(
         ([dayName, dayData]) => {
           return new ScheduleEntity(
             object.dentist, 
             parseInt(dayName),  
             dayData.start, 
             dayData.end, 
             dayData.slotDuration,
             dayData.breaks, 
             dayData.slots 
           );
         }
       ); */

      return [undefined, new UpdateScheduleDto(object.dentist, schedule)];
    } catch (error) {
      return ["Error processing schedule data"];
    }
  }
}
