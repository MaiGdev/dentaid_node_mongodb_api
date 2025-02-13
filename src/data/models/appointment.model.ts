import mongoose, { Schema } from "mongoose";

interface IAppointment extends Document {
  dentist: string;
  patient: string;
  start: string;
  end: string;
  status: string;
}


const AppointmentSchema = new Schema({
  dentist: { type: Schema.Types.ObjectId, ref: "User", required: true },
  patient: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Schema.Types.Date, ref: "Date", required: true },
  dayOfWeek: { type: Number, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"] },
});



export const AppointmentModel = mongoose.model<IAppointment>(
  "Appointment",
  AppointmentSchema
);
