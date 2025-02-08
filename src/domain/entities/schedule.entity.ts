export class ScheduleEntity {
  constructor(
    public dentist: string,
    public dayOfWeek: number,
    public startTime: string,
    public endTime: string,
    public slotDuration: number,
    public breaks: { start: string; end: string }[],
    public slots: { start: string; end: string }[]
  ) {}
}
