import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { EmergencyKey } from "./emergencyGuide";

const EMERGENCY_TYPES: { key: EmergencyKey; label: string; icon: string }[] = [
  { key: "heart", label: "Heart Attack", icon: "❤️" },
  { key: "fall", label: "Fall / Injury", icon: "🤕" },
  { key: "blood", label: "Blood Loss", icon: "🩸" },
  { key: "breathing", label: "Breathing Issue", icon: "💨" },
  { key: "burn", label: "Burn", icon: "🔥" },
];

interface EmergencyGreetingProps {
  onSelectType: (type: EmergencyKey) => void;
}

export default function EmergencyGreeting({ onSelectType }: EmergencyGreetingProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>What's your emergency?</Text>
        <Text style={styles.subtitle}>
          Select what's happening to you right now
        </Text>
      </View>

      <View style={styles.grid}>
        {EMERGENCY_TYPES.map((type) => (
          <Pressable
            key={type.key}
            style={styles.card}
            onPress={() => onSelectType(type.key)}
            android_ripple={{ color: "rgba(211,47,47,0.2)" }}
          >
            <Text style={styles.icon}>{type.icon}</Text>
            <Text style={styles.label}>{type.label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Help is being notified as soon as you select
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 24,
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#212121",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#616161",
    textAlign: "center",
    fontWeight: "500",
  },
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "flex-start",
    gap: 16,
  },
  card: {
    width: "48%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#f5f5f5",
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#424242",
    textAlign: "center",
  },
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff3e0",
    borderRadius: 12,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#ff9800",
  },
  footerText: {
    fontSize: 14,
    color: "#e65100",
    fontWeight: "600",
    textAlign: "center",
  },
});