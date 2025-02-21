import { envs } from "../../config";
import {
  generateSlots,
  getRandomAllergies,
  getRandomItems,
  getRandomMedicalConditions,
} from "../../presentation/helpers";

import {
  AppointmentModel,
  DentistModel,
  DentistScheduleModel,
  PatientModel,
  UserModel,
} from "../models";
import { MongoDatabase } from "../mongo/mongo-database";
import { seedData } from "./data";

(async () => {
  await MongoDatabase.connect({
    dbname: envs.MONGO_DBNAME,
    mongoUrl: envs.MONGO_URL,
  });

  await main();

  MongoDatabase.disconnect();
})();

async function main() {
  // Delete database documents
  await Promise.all([
    UserModel.deleteMany(),
    DentistModel.deleteMany(),
    PatientModel.deleteMany(),
    DentistScheduleModel.deleteMany(),
    AppointmentModel.deleteMany(),
  ]);

  // Create users
  const users = await UserModel.insertMany(seedData.users);

  // Create dentist and link them to the user model
  const dentists = await Promise.all(
    users
      .filter((user) => user.role.includes("DENTIST_ROLE"))
      .map(async (user) => {
        const dentist = new DentistModel({
          user: user._id,
          speciality: ["General Dentistry"],
          workplace: "Dental Clinic",
          university: getRandomItems(seedData.universities, 1)[0],
          yearsOfExperience: Math.floor(Math.random() * 15),
          medicalLicenseNumber: `LIC-${Math.floor(Math.random() * 10000)}`,
        });
        console.log(dentist.university); // Verifica la universidad asignada
        return dentist.save();
      })
  );

  // Create patient and link them to the user model
  const patients = await Promise.all(
    users
      .filter((user) => user.role.includes("PATIENT_ROLE"))
      .map(async (user) => {
        const patient = new PatientModel({
          user: user._id,
          bloodType: "A+",
          knownAllergies: getRandomAllergies(),
          medicalConditions: getRandomMedicalConditions(),
        });
        return patient.save();
      })
  );

  // Create schedule for dentists
  const schedules = await Promise.all(
    dentists.map(async (dentist) => {
      const schedule = new DentistScheduleModel({
        dentist: dentist._id,
        dayOfWeek: 1,
        startTime: "09:00",
        endTime: "18:00",
        slotDuration: 30,
        breaks: [],
        slots: generateSlots("09:00", "18:00", 30),
      });
      return schedule.save();
    })
  );

  // Create appointments for both patient and dentist
  const appointments = await Promise.all(
    patients.map(async (patient, index) => {
      const dentist = dentists[index % dentists.length];
      const schedule = schedules.find(
        (s) => s.dentist.toString() === dentist._id.toString()
      );

      if (schedule && schedule.slots.length > 0) {
        const slot = schedule.slots[0];
        const appointment = new AppointmentModel({
          dentist: dentist._id,
          patient: patient._id,
          date: new Date().toISOString().split("T")[0],
          dayOfWeek: schedule.dayOfWeek,
          start: slot.start,
          end: slot.end,
          description: "Routine checkup",
          status: "scheduled",
        });
        return appointment.save();
      }
    })
  );

  console.log("Database seeded successfully!");
  console.log({ users, patients, dentists, schedules, appointments });
}
