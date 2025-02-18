import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  fullName: {
    type: String,
    required: [true, "Name is required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ["Male", "Female", "Other", "Prefer Not to Say"],
  },
  dateOfBirth: {
    type: Date,
    required: true,
    validate: {
      validator: function (value: Date) {
        return value < new Date(); // Only dates in the past
      },
      message: "The date of birth must be in the past.",
    },
  },
  identification: {
    type: String,
    required: [true, "Identification is required"],
    unique: true,
  },
  phoneNumber: {
    type: String,
    sparse: true,
    unique: true,
/*     match: /^[0-9]{10}$/, */
  },
  emergencyPhoneNumber: {
    type: String,
    sparse: true,
    unique: true,
   /*  match: /^[0-9]{10}$/, */
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },

  role: {
    type: [String],
    default: ["USER_ROLE"],
    enum: ["ADMIN_ROLE", "PATIENT_ROLE", "DENTIST_ROLE"],
  },
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret.password;
  },
});
export const UserModel = mongoose.model("User", userSchema);
