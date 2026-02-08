import { View, Text, StyleSheet } from "react-native";
import OverviewCards from "./OverviewCards";
import PatientList from "./PatientList";
import EmergencyHistory from "./EmergencyHistory";

export default function DoctorDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Doctor Dashboard</Text>

      <OverviewCards />

      <Text style={styles.section}>Patients</Text>
      <PatientList />

      <Text style={styles.section}>Recent Emergencies</Text>
      <EmergencyHistory />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 12
  },
  section: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10
  }
});
