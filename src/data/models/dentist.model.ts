

import mongoose from "mongoose";


const dentistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
  }
  
});

dentistSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

export const DentistModel = mongoose.model("Dentist", dentistSchema);

