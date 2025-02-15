const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const addMinutes = (time: string, minutes: number) => {
  const [hours, mins] = time.split(":").map(Number);
  const totalMinutes = hours * 60 + mins + minutes;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMinutes = totalMinutes % 60;
  return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(
    2,
    "0"
  )}`;
};

export const generateSlots = (
  startTime: string,
  endTime: string,
  slotDuration: number
) => {
  const slots = [];
  let currentTime = startTime;

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  while (timeToMinutes(currentTime) < endMinutes) {
    const start = currentTime;
    const end = addMinutes(currentTime, slotDuration);
    slots.push({ start, end });
    currentTime = end;
  }

  return slots;
};

export const HandleScheduleSlots = {
  generateSlots,
};
