import { View, Text, StyleSheet } from "react-native";
import PatientList from "./PatientList";

export default function DoctorDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Doctor Dashboard</Text>
      <Text style={styles.section}>Patient Overview</Text>
      <PatientList />
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 10
  },
  section: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10
  }
});
