import mongoose, { Schema } from "mongoose";

interface IAppointment extends Document {
  dentist: string;
  patient: string;
  start: string;
  end: string;
  status: string;
}

const AppointmentSchema = new Schema({
  dentist: { type: Schema.Types.ObjectId, ref: "Dentist", required: true },
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  date: {
    type: Date,
    required: true,
  },
  dayOfWeek: { type: Number, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["scheduled", "finished", "cancelled"],
    default: "scheduled",
  },
});

export const AppointmentModel = mongoose.model<IAppointment>(
  "Appointment",
  AppointmentSchema
);
