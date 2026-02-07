import { View, Text, FlatList, StyleSheet } from "react-native";
import { patients } from "./mockData";

export default function EmergencyHistory() {
  const events = patients.flatMap((p) =>
    p.emergencies.map((e) => ({
      ...e,
      patient: p.name
    }))
  );

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.patient}>{item.patient}</Text>
          <Text>Date: {item.date}</Text>
          <Text>Reason: {item.reason}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: "#DC2626",
    padding: 12,
    marginBottom: 10
  },
  patient: {
    color: "#DC2626",
    fontWeight: "bold"
  }
});
