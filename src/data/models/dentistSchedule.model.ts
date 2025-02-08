import mongoose, { Document, Schema } from "mongoose";

interface IDentistSchedule extends Document {
  dentist: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  slotDuration: number;
  breaks: { start: string; end: string }[];
  slots: { start: string; end: string }[];
}

const dentistScheduleSchema = new Schema({
  dentist: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dayOfWeek: { type: Number, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  slotDuration: { type: Number, default: 30 },
  breaks: [{ start: String, end: String }],
  slots: [{ start: String, end: String }],
});

dentistScheduleSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id; 
  },
});

export const DentistScheduleModel = mongoose.model<IDentistSchedule>(
  "DentistSchedule",
  dentistScheduleSchema
);
