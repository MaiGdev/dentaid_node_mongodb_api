import { Appointment, DentistScheduleModel } from "../../data";

export class AppointmentService {
  async getAvailableSlots(dentistId: string, date: Date) {
    const dayOfWeek = date.getDay();

    const schedule = await DentistScheduleModel.findOne({
      dentist: dentistId,
      dayOfWeek: dayOfWeek,
    });

    if (!schedule) return [];

    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const appointments = await Appointment.find({
      dentist: dentistId,
      start: { $gte: startOfDay },
      end: { $lte: endOfDay },
    });

    const allSlots = [];
    const [startHour, startMinute] = schedule.startTime.split(":").map(Number);
    const [endHour, endMinute] = schedule.endTime.split(":").map(Number);

    let current = new Date(date);
    current.setHours(startHour, startMinute, 0, 0);

    const endTime = new Date(date);
    endTime.setHours(endHour, endMinute, 0, 0);

    while (current < endTime) {
      const slotEnd = new Date(
        current.getTime() + schedule.slotDuration * 60000
      );
      allSlots.push({ start: new Date(current), end: slotEnd });
      current = slotEnd;
    }

    const bookedSlots = appointments.map((a) => ({
      start: a.start,
      end: a.end,
    }));

    return allSlots.filter(
      (slot) =>
        !bookedSlots.some(
          (booked) => slot.start < booked.end && slot.end > booked.start
        )
    );
  }

}
