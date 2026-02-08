import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function DoctorDashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctor Dashboard</Text>

      {/* Patients */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/doctor/patients")}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>👨‍⚕️</Text>
        <Text style={styles.text}>Patients</Text>
      </TouchableOpacity>

      {/* Appointments */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/doctor/appointments")}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>📅</Text>
        <Text style={styles.text}>Appointments</Text>
      </TouchableOpacity>

      {/* Emergencies */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/doctor/emergencies")}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>🚨</Text>
        <Text style={styles.text}>Emergencies</Text>
      </TouchableOpacity>

      {/* Analytics */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/doctor/analytics")}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>📊</Text>
        <Text style={styles.text}>Analytics</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  card: {
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    fontSize: 20,
    marginRight: 12
  },
  text: {
    fontSize: 16,
    fontWeight: "500"
  }
});
