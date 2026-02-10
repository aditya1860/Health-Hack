import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function EmergencyFab() {
  return (
    <TouchableOpacity
      style={styles.fab}
      activeOpacity={0.8}
      onPress={() => router.push("/emergency")}
    >
      <Text style={styles.text}>SOS</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#DC2626",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  text: {
    color: "#FFF",
    fontWeight: "900",
    fontSize: 14,
    letterSpacing: 1,
  },
});
