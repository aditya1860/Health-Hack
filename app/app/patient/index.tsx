import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { router, Href, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSession, logout } from "../../utils/storage";

export default function PatientDashboard() {
  const routerLocal = useRouter();
  const [loading, setLoading] = useState(true);

useEffect(() => {
  let isMounted = true;

  const init = async () => {
    const user = await getSession();

    if (!isMounted) return;

    if (!user || user.role !== "patient") {
      router.replace("/role-select");
      return;
    }

    setLoading(false);
  };

  init();

  return () => {
    isMounted = false;
  };
}, []);


  const handleLogout = async () => {
    await logout();
    router.replace("/role-select");
  };

  if (loading) return null;

  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.header}>Patient Dashboard</Text>
          <Text style={styles.greeting}>Good Morning</Text>
        </View>

        <Pressable onPress={handleLogout}>
          <Text style={styles.logout}>Logout</Text>
        </Pressable>
      </View>

      {/* Status */}
      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>
          Status: Awaiting Today’s Check-in
        </Text>
        <Text style={styles.statusSub}>
          Last Check-in: Yesterday, 8:40 PM
        </Text>
      </View>

      {/* Daily Monitoring */}
      <Text style={styles.sectionTitle}>Daily Monitoring</Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          Please complete your daily health check-in to update
          your vitals and monitoring status.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => routerLocal.push("./checkin")}
      >
        <Text style={styles.primaryText}>
          Start Daily Check-in
        </Text>
      </TouchableOpacity>

      {/* Medication Reminder */}
      <Text style={styles.sectionTitle}>Medication Reminder</Text>

      <View style={styles.reminderCard}>
        <Text style={styles.reminderTitle}>
          Morning Medication
        </Text>
        <Text style={styles.reminderText}>
          Take prescribed medicines at 10:00 AM.
        </Text>
      </View>

      {/* Doctor Message */}
      <Text style={styles.sectionTitle}>Doctor Message</Text>

      <View style={styles.messageCard}>
        <Text style={styles.messageText}>
          Your caregiver reviewed yesterday’s readings.
          Continue regular monitoring and stay hydrated.
        </Text>
      </View>

      {/* Health Tips */}
      <Text style={styles.sectionTitle}>Health Tips</Text>

      <View style={styles.tipCard}>
        <Text style={styles.tipText}>
          Maintain hydration levels throughout the day.
        </Text>
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipText}>
          A 20-minute walk can help regulate heart health.
        </Text>
      </View>

      {/* Appointment */}
      <Text style={styles.sectionTitle}>Upcoming Appointment</Text>

      <View style={styles.appointmentCard}>
        <Text style={styles.appointmentTitle}>
          Cardiologist Consultation
        </Text>
        <Text style={styles.appointmentText}>
          Scheduled on 28 Feb, 11:30 AM
        </Text>
      </View>

      {/* Emergency */}
      <Text style={styles.sectionTitle}>Emergency Access</Text>

      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={() => routerLocal.push("/emergency")}
      >
        <Text style={styles.emergencyText}>
          Emergency Assistance
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
  },

  greeting: {
    fontSize: 16,
    color: "#4B5563",
  },

  logout: {
    color: "#DC2626",
    fontWeight: "600",
  },

  statusCard: {
    backgroundColor: "#E0F2FE",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },

  statusTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },

  statusSub: {
    color: "#6B7280",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },

  infoCard: {
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
  },

  infoText: {
    color: "#374151",
    lineHeight: 20,
  },

  primaryButton: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },

  primaryText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },

  reminderCard: {
    backgroundColor: "#FEF3C7",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
  },

  reminderTitle: {
    fontWeight: "600",
    marginBottom: 4,
  },

  reminderText: {
    color: "#92400E",
  },

  messageCard: {
    backgroundColor: "#E5E7EB",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
  },

  messageText: {
    color: "#111827",
    lineHeight: 20,
  },

  tipCard: {
    backgroundColor: "#ECFEFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },

  tipText: {
    color: "#155E75",
  },

  appointmentCard: {
    backgroundColor: "#EEF2FF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
  },

  appointmentTitle: {
    fontWeight: "600",
    marginBottom: 4,
  },

  appointmentText: {
    color: "#3730A3",
  },

  emergencyButton: {
    backgroundColor: "#DC2626",
    padding: 16,
    borderRadius: 12,
    marginBottom: 40,
  },

  emergencyText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});
