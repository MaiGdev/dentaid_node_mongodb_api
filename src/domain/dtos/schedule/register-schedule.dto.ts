export class RegisterScheduleDto {
  constructor(
    public readonly dentist: string,
    public readonly dayOfWeek: number,
    public readonly startTime: string,
    public readonly endTime: string,
    public readonly slotDuration: number,
    public readonly breaks: { start: string; end: string }[],
    public readonly slots: { start: string; end: string }[]
  ) {}

  static registerSchedule = (object: {
    [key: string]: any;
  }): [string?, RegisterScheduleDto?] => {
    const {
      dentist,
      dayOfWeek,
      startTime,
      endTime,
      slotDuration,
      breaks,
      slots,
    } = object;

    const requiredFields = [
      "dentist",
      "dayOfWeek",
      "startTime",
      "endTime",
      "slotDuration",
      "breaks",
      "slots",
    ];
    for (const field of requiredFields) {
      if (object[field] === undefined || object[field] === null) {
        return [`Missing ${field}`];
      }
    }
    return [
      undefined,
      new RegisterScheduleDto(
        dentist,
        dayOfWeek,
        startTime,
        endTime,
        slotDuration,
        breaks,
        slots
      ),
    ];
  };
}
