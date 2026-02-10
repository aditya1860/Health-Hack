import AsyncStorage from "@react-native-async-storage/async-storage";

export const getDoctorPatients = async (doctorId: string) => {
  const data = await AsyncStorage.getItem("DOCTOR_CONNECTIONS");
  const connections = data ? JSON.parse(data) : {};
  return connections[doctorId] || [];
};

export const getPatientDoctor = async () => {
  const data = await AsyncStorage.getItem("PATIENT_CONNECTION");
  return data ? JSON.parse(data) : null;
};
export const saveConnection = async (
  doctorId: string,
  patientId: string
) => {
  const data = await AsyncStorage.getItem("DOCTOR_CONNECTIONS");
  const connections = data ? JSON.parse(data) : {};

  connections[doctorId] = connections[doctorId] || [];
  connections[doctorId].push(patientId);

  await AsyncStorage.setItem(
    "DOCTOR_CONNECTIONS",
    JSON.stringify(connections)
  );

  await AsyncStorage.setItem(
    "PATIENT_CONNECTION",
    JSON.stringify({ patientId, doctorId })
  );
};
