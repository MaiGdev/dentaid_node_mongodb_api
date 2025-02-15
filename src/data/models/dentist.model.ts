import mongoose from "mongoose";
import { UserModel } from "./user.model";

const dentistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  speciality: {
    type: [String],
    required: [true, "Speciality is required"],
  },
  medicalLicenseNumber: {
    type: String,
    required: [true, "Medical License Number is required"],
    unique: true,
  },
  university: {
    type: String,
  },
  workplace: {
    type: String,
    required: [true, "Workplace is required"],
  },
  yearsOfExperience: {
    type: Number,
  },
});

dentistSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

dentistSchema.pre("save", async function (next) {
  const user = await UserModel.findById(this.user);
  if (!user || !user.role.includes("DENTIST_ROLE")) {
    throw new Error("The referenced user must have the DENTIST_ROLE.");
  }
  next();
});

export const DentistModel = mongoose.model("Dentist", dentistSchema);
