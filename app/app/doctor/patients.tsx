import { View, Text, StyleSheet } from "react-native";
import PatientList from "./PatientList";

export default function PatientsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patients</Text>
      <PatientList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12
  }
});
