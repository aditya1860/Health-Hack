import React from "react";
import { View, Text, StyleSheet } from "react-native";

type RiskLevel = "Low" | "Medium" | "High";

export default function RiskBadge({ level }: { level: RiskLevel }) {
  const bg =
    level === "High"
      ? "#EF4444"
      : level === "Medium"
      ? "#F59E0B"
      : "#10B981";

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={styles.text}>{level} Risk</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  text: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
