import mongoose, { Schema } from "mongoose";
import { UserModel } from "./user.model";

const patientSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  bloodType: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"],
    default: "Unknown",
  },
  knownAllergies: {
    type: [String],
    required: true,
  },
  medicalConditions: {
    type: [String],
    required: true,
  },
});

patientSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

patientSchema.pre("save", async function (next) {
  const user = await UserModel.findById(this.user);
  if (!user || !user.role.includes("PATIENT_ROLE")) {
    throw new Error("The referenced user must have the DENTIST_ROLE.");
  }
  next();
});

export const PatientModel = mongoose.model("Patient", patientSchema);
