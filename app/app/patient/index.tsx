import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PatientHome() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const done = await AsyncStorage.getItem("onboardingDone");

      if (!done) {
        router.replace("./onboarding");
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Onboarding check failed:", error);
      setLoading(false);
    }
  };

  if (loading) return null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Text style={styles.header}>Patient Dashboard</Text>
      <Text style={styles.greeting}>Good Morning, John</Text>

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
          Please complete your daily health check-in to update your vitals and
          monitoring status.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push("./checkin")}
        activeOpacity={0.8}
      >
        <Text style={styles.primaryText}>Start Daily Check-in</Text>
      </TouchableOpacity>

      {/* Medication Reminder */}
      <Text style={styles.sectionTitle}>Medication Reminder</Text>

      <View style={styles.reminderCard}>
        <Text style={styles.reminderTitle}>Morning Medication</Text>
        <Text style={styles.reminderText}>
          Take prescribed medicines at 10:00 AM.
        </Text>
      </View>

      {/* Doctor Message */}
      <Text style={styles.sectionTitle}>Doctor Message</Text>

      <View style={styles.messageCard}>
        <Text style={styles.messageText}>
          Your caregiver reviewed yesterday’s readings. Continue regular
          monitoring and stay hydrated.
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

      <TouchableOpacity style={styles.emergencyButton} activeOpacity={0.85}>
        <Text style={styles.emergencyText}>Emergency Assistance</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    padding: 16,
  },

  header: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 4,
    color: "#111827",
  },

  greeting: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 12,
    color: "#111827",
  },

  statusCard: {
    backgroundColor: "#E0F2FE",
    padding: 16,
    borderRadius: 12,
  },

  statusTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0369A1",
  },

  statusSub: {
    marginTop: 6,
    fontSize: 14,
    color: "#075985",
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  infoText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },

  primaryButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },

  primaryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  reminderCard: {
    backgroundColor: "#FEF3C7",
    padding: 16,
    borderRadius: 12,
  },

  reminderTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#92400E",
  },

  reminderText: {
    marginTop: 6,
    fontSize: 14,
    color: "#78350F",
  },

  messageCard: {
    backgroundColor: "#ECFEFF",
    padding: 16,
    borderRadius: 12,
  },

  messageText: {
    fontSize: 14,
    color: "#065F46",
    lineHeight: 20,
  },

  tipCard: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },

  tipText: {
    fontSize: 14,
    color: "#374151",
  },

  appointmentCard: {
    backgroundColor: "#F0FDF4",
    padding: 16,
    borderRadius: 12,
  },

  appointmentTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#166534",
  },

  appointmentText: {
    marginTop: 6,
    fontSize: 14,
    color: "#14532D",
  },

  emergencyButton: {
    backgroundColor: "#DC2626",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 24,
  },

  emergencyText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
