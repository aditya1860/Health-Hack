const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* ------------------ In-Memory Storage ------------------ */

const doctors = {};
const patients = {};
const connectCodes = {};

/* ------------------ Generate Connect Code ------------------ */

app.post("/generate-code", (req, res) => {
  const { doctorId, doctorName } = req.body;

  if (!doctorId) {
    return res.status(400).json({ error: "Doctor ID required" });
  }

  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  doctors[doctorId] = {
    doctorId,
    doctorName,
    patients: []
  };

  connectCodes[code] = doctorId;

  res.json({ code });
});

/* ------------------ Connect Patient ------------------ */

app.post("/connect-patient", (req, res) => {
  const { patientId, patientName, code } = req.body;

  const doctorId = connectCodes[code];

  if (!doctorId) {
    return res.status(400).json({ error: "Invalid code" });
  }

  patients[patientId] = {
    patientId,
    patientName,
    doctorId,
    medicalHistory: [],
    checkIns: [],
    emergencies: []
  };

  doctors[doctorId].patients.push(patientId);

  res.json({ message: "Connected successfully" });
});

/* ------------------ Submit Check-in ------------------ */

app.post("/checkin", (req, res) => {
  const { patientId, vitals } = req.body;

  const patient = patients[patientId];

  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  const riskLevel = calculateRisk(vitals);

  const checkIn = {
    timestamp: new Date(),
    vitals,
    riskLevel
  };

  patient.checkIns.push(checkIn);

  res.json({ riskLevel });
});

/* ------------------ Get Doctor Patients ------------------ */

app.get("/doctor/:doctorId", (req, res) => {
  const { doctorId } = req.params;

  const doctor = doctors[doctorId];

  if (!doctor) {
    return res.status(404).json({ error: "Doctor not found" });
  }

  const doctorPatients = doctor.patients.map(id => patients[id]);

  res.json({ patients: doctorPatients });
});

/* ------------------ Risk Engine ------------------ */

function calculateRisk(vitals) {
  const { oxygen, heartRate } = vitals;

  if (oxygen < 85) return "HIGH";
  if (oxygen < 92) return "MEDIUM";
  if (heartRate > 120) return "MEDIUM";

  return "LOW";
}

/* ------------------ Start Server ------------------ */

app.listen(5000, "0.0.0.0", () => {
  console.log("CareFast backend running on port 5000");
});
