import mongoose, { Schema } from "mongoose";

interface IAppointment extends Document {
  dentist: string;
  patient: string;
  start: Date;
  end: Date;
  status: string;
}

const AppointmentSchema = new Schema({
  dentist: { type: Schema.Types.ObjectId, ref: "User", required: true },
  patient: { type: Schema.Types.ObjectId, ref: "User", required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"] },
});

export const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  AppointmentSchema
);
