import { View, Text, StyleSheet } from "react-native";

export default function StatusCard({
  title,
  value,
  sub,
  valueColor,
}: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value, valueColor && { color: valueColor }]}>
        {value}
      </Text>
      <Text style={styles.sub}>{sub}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  title: {
    fontWeight: "600",
    marginBottom: 6,
    fontSize: 13,
    color: "#6B7280",
  },

  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },

  sub: {
    color: "#9CA3AF",
    marginTop: 4,
    fontSize: 12,
  },
});