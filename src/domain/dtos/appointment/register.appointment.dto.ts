import { MomentAdapter } from "../../../config";

export class RegisterAppointmentDto {
  constructor(
    public dentist: string,
    public patient: string,
    public date: Date,
    public dayOfWeek: number,
    public start: string,
    public end: string,
    public description: string,
    public status: string
  ) {}

  static registerAppointment(object: {
    [key: string]: any;
  }): [string?, RegisterAppointmentDto?] {
    const {
      dentistId,
      patientId,
      date,
      dayOfWeek,
      start,
      end,
      description,
      status,
    } = object;

    const requiredFields = ["dentist", "patient", "date", "start", "end"];

    requiredFields.map((field) => {
      if (!object[field]) {
        return [`Missing ${field}`];
      }
    });

    if (!MomentAdapter.isValid(date)) return ["Date format incorrect"];

    return [
      undefined,
      new RegisterAppointmentDto(
        dentistId,
        patientId,
        new Date(date),
        dayOfWeek,
        start,
        end,
        description,
        status
      ),
    ];
  }
}
