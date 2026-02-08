import { View, Text, StyleSheet } from "react-native";
import { patients } from "./mockData";

export default function OverviewCards() {
  const total = patients.length;
  const highRisk = patients.filter(p => p.risk === "HIGH").length;
  const emergencies = patients.filter(p => p.emergencies.length > 0).length;

  return (
    <View style={styles.row}>
      <Card title="Patients" value={total} />
      <Card title="High Risk" value={highRisk} color="#DC2626" />
      <Card title="Emergencies" value={emergencies} color="#B91C1C" />
    </View>
  );
}

function Card({ title, value, color = "#2563EB" }) {
  return (
    <View style={[styles.card, { borderColor: color }]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16
  },
  card: {
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    alignItems: "center"
  },
  value: {
    fontSize: 20,
    fontWeight: "bold"
  },
  title: {
    fontSize: 12,
    color: "#6B7280"
  }
});
