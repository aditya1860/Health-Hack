import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Patient Dashboard</Text>
      <Text style={styles.exit}>Exit Dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  exit: {
    color: "#2563EB",
  },
});
