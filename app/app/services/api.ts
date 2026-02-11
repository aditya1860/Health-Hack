const BASE_URL = "https://hydrolysable-procrastinatively-sherron.ngrok-free.dev"; 

export const generateCode = async (doctorId: string, doctorName: string) => {
  const res = await fetch(`${BASE_URL}/generate-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ doctorId, doctorName }),
  });

  return res.json();
};

export const connectPatient = async (
  patientId: string,
  patientName: string,
  code: string
) => {
  const res = await fetch(`${BASE_URL}/connect-patient`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ patientId, patientName, code }),
  });

  return res.json();
};

export const fetchDoctorPatients = async (doctorId: string) => {
  const res = await fetch(`${BASE_URL}/doctor/${doctorId}`);
  return res.json();
};
