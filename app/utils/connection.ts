import AsyncStorage from "@react-native-async-storage/async-storage";

const CODES_KEY = "ACTIVE_CONNECTION_CODES";
const DOCTOR_CONNECTIONS = "DOCTOR_CONNECTIONS";
const PATIENT_CONNECTION = "PATIENT_CONNECTION";

// save generated code
export const saveConnectionCode = async (
  code: string,
  doctorPhone: string
) => {
  const data = await AsyncStorage.getItem(CODES_KEY);
  const codes = data ? JSON.parse(data) : {};

  codes[code] = {
    doctorPhone,
    createdAt: Date.now(),
  };

  await AsyncStorage.setItem(CODES_KEY, JSON.stringify(codes));
};

// consume code when patient connects
export const consumeConnectionCode = async (
  code: string,
  patientId: string
) => {
  const data = await AsyncStorage.getItem(CODES_KEY);
  const codes = data ? JSON.parse(data) : {};

  const entry = codes[code];
  if (!entry) return null;

  const { doctorId } = entry;

  // save doctor → patients
  const docData = await AsyncStorage.getItem(DOCTOR_CONNECTIONS);
  const connections = docData ? JSON.parse(docData) : {};

  connections[doctorId] = connections[doctorId] || [];
  connections[doctorId].push(patientId);

  await AsyncStorage.setItem(
    DOCTOR_CONNECTIONS,
    JSON.stringify(connections)
  );

  // save patient → doctor
  await AsyncStorage.setItem(
    PATIENT_CONNECTION,
    JSON.stringify({ patientId, doctorId })
  );

  // remove used code
  delete codes[code];
  await AsyncStorage.setItem(CODES_KEY, JSON.stringify(codes));

  return { doctorId };
};
// get all patients connected to a doctor
export const getDoctorPatients = async (doctorId: string) => {
  const data = await AsyncStorage.getItem(DOCTOR_CONNECTIONS);
  const connections = data ? JSON.parse(data) : {};

  return connections[doctorId] || [];
};

// get doctor connected to current patient
export const getPatientDoctor = async () => {
  const data = await AsyncStorage.getItem(PATIENT_CONNECTION);
  return data ? JSON.parse(data) : null;
};