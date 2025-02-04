import mongoose, { Schema } from "mongoose";

interface IDentistSchedule extends Document {
  dentist: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  slotDuration: number;
  breaks: { start: string; end: string }[];
}

const DentistScheduleSchema = new Schema({
  dentist: { type: Schema.Types.ObjectId, ref: "User", required: true },
  dayOfWeek: { type: Number, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  slotDuration: { type: Number, default: 30 },
  breaks: [{ start: String, end: String }],
});

export const DentistSchedule = mongoose.model<IDentistSchedule>(
  "DentistSchedule",
  DentistScheduleSchema
);
