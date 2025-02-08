import { ScheduleEntity } from "../../entities/schedule.entity";

export class RegisterScheduleDto {
  constructor(
    public readonly dentist: string,
    public readonly schedule: ScheduleEntity[]
  ) {}

  static registerSchedule(object: {
    dentist: string;
    schedule: any[];
  }): [string?, RegisterScheduleDto?] {
    if (!object?.dentist || !Array.isArray(object.schedule)) {
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
      return [undefined, new RegisterScheduleDto(object.dentist, schedule)];
    } catch (error) {
      return ["Error processing schedule data"];
    }
  }
}
