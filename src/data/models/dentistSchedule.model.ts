import mongoose, { Document, Schema } from "mongoose";
import { DentistModel } from "./dentist.model";

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
    ref: "Dentist",
    required: true,
  },
  dayOfWeek: {
    type: Number,
    required: true,
    min: 0,
    max: 6,
  },
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
    ret.slots.forEach((slot: any) => delete slot._id);
    ret.slots.forEach((slot: any) => delete slot.id);
  },
});

dentistScheduleSchema.pre("save", async function (next) {
  const user = await DentistModel.findById(this.dentist);
  if (!user) {
    throw new Error("The referenced user must have the DENTIST_ROLE.");
  }
  next();
});

export const DentistScheduleModel = mongoose.model<IDentistSchedule>(
  "DentistSchedule",
  dentistScheduleSchema
);
