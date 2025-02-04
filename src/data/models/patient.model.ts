import mongoose, { Schema } from "mongoose";

const patientSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bloodType: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"],
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

export const PatientModel = mongoose.model("Patient", patientSchema);
