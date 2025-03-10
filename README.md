# DentAid - Backend API

DentAid is the backend API for an online dental appointment booking system. It enables patients to schedule appointments with dentists, dentists to manage their schedules and view patient details, and administrators to oversee users and appointments. Administrators have full access to all system functionalities, including user management, appointment control, and schedule configuration.

---

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Framework for building RESTful API.
- **TypeScript**: Superset of JavaScript with static types.
- **MongoDB**: NoSQL database for data storage.
- **JWT (JSON Web Tokens)**: Authentication and security.
- **Nodemailer**: Email notifications.
- **Moment.js**: Date and time handling.
- **Bcrypt**: Password hashing.

---

## 📂 Project Structure

```
/src
│
├── /controllers   # Handles route logic
├── /models        # MongoDB schemas
├── /routes        # API routes
├── /services      # Business logic and services
├── /utils         # Utilities and helper functions
├── /types         # TypeScript types
├── app.ts         # Express configuration
└── server.ts      # Server entry point
```

---

## 🔧 Installation

### 1️⃣ Clone the repository:

```bash
git clone https://github.com/MaiGdev/dentaid_node_mongodb_api.git
cd dentaid_node_mongodb_api
```

### 2️⃣ Install dependencies:

```bash
npm install
```

### 3️⃣ Set up environment variables:

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGO_URL=mongodb:
MONGO_DBNAME=dentaid
JWT_SEED=your-secret-key
MAILER_SERVICE=gmail
MAILER_EMAIL=your-email@gmail.com
MAILER_SECRET_KEY=your-email-secret-key
```

### 4️⃣ Start the server:

#### Development mode:

```bash
npm run dev
```

#### Production mode:

```bash
npm run build
npm start
```

---

## 🌍 Environment Variables

| Variable          | Description                   | Default Value             |
| ----------------- | ----------------------------- | ------------------------- |
| PORT              | Port for the server           | 3000                      |
| MONGO_URL         | MongoDB connection URL        | mongodb://localhost:27017 |
| MONGO_DBNAME      | Database name                 | dentaid                   |
| JWT_SEED          | Secret key for JWT tokens     | (required)                |
| MAILER_SERVICE    | Email service (e.g., Gmail)   | (optional)                |
| MAILER_EMAIL      | Email address for Nodemailer  | (optional)                |
| MAILER_SECRET_KEY | Email password for Nodemailer | (optional)                |

---

## 📌 Main Models

### 🧑 User

- `email`: User's email.
- `emailValidated`: Email verification status.
- `password`: Hashed password.
- `fullName`: Full name.
- `gender`: Gender.
- `dateOfBirth`: Date of birth.
- `identification`: Unique identification number.
- `phoneNumber`: Contact number.
- `emergencyPhoneNumber`: Emergency contact.
- `address`: Address.
- `role`: Role (ADMIN_ROLE, PATIENT_ROLE, DENTIST_ROLE).

### 🦷 Dentist

- `user`: Reference to User.
- `speciality`: Dentist's specialization.
- `medicalLicenseNumber`: License number.
- `university`: University attended.
- `workplace`: Current workplace.
- `yearsOfExperience`: Experience in years.

### 🏥 Patient

- `user`: Reference to User.
- `bloodType`: Blood type.
- `knownAllergies`: List of allergies.
- `medicalConditions`: Existing conditions.

### 📅 DentistSchedule

- `dentist`: Reference to Dentist.
- `dayOfWeek`: Day of the week (0 = Sunday, 6 = Saturday).
- `startTime`: Workday start time.
- `endTime`: Workday end time.
- `slotDuration`: Appointment slot duration (minutes).
- `breaks`: List of scheduled breaks.
- `slots`: Available appointment slots.

### 🏥 Appointment

- `dentist`: Reference to Dentist.
- `patient`: Reference to Patient.
- `date`: Appointment date.
- `dayOfWeek`: Day of the week.
- `start`: Start time.
- `end`: End time.
- `description`: Notes about the appointment.
- `status`: Appointment status (scheduled, finished, cancelled).

---

## 🔗 API Endpoints

### 🛡 Authentication

- **POST** `/api/auth/register` → Register a new user (patient, dentist, admin).
- **POST** `/api/auth/login` → Log in and get JWT token.
- **POST** `/api/auth/renew` → Renew JWT token.

### 👤 Users

- **GET** `/api/user` → List users by role.
- **GET** `/api/user/getUser` → Get user details.
- **PUT** `/api/user` → Update user info.
- **PUT** `/api/user/dentist` → Update dentist info.
- **PUT** `/api/user/patient` → Update patient info.

### ⏰ Schedules

- **POST** `/api/schedule` → Create dentist schedule.
- **PUT** `/api/schedule` → Update schedule.
- **GET** `/api/schedule` → Get schedule.
- **GET** `/api/schedule/availableSlots` → Get available slots.

### 📅 Appointments

- **POST** `/api/appointments` → Create an appointment.
- **GET** `/api/appointments` → Get all appointments.
- **GET** `/api/appointments/patient/:id` → Get patient appointments.
- **GET** `/api/appointments/dentist/:id` → Get dentist appointments.
