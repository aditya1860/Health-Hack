import { View, Text, StyleSheet } from "react-native";

export default function StatusCard({
  title,
  value,
  sub,
}: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
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
    marginRight: 12,
    elevation: 2,
  },

  title: {
    fontWeight: "600",
    marginBottom: 6,
  },

  value: {
    fontSize: 16,
    fontWeight: "bold",
  },

  sub: {
    color: "#6B7280",
    marginTop: 4,
  },
});
