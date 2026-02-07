import { View, Text, FlatList, StyleSheet } from "react-native";
import { patients } from "./mockData";
import RiskBadge from "./RiskBadge";

export default function PatientList() {
  return (
    <FlatList
      data={patients}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 20 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>Age: {item.age}</Text>
          <RiskBadge risk={item.risk as any} />
          <Text style={styles.last}>
            Last Emergency: {item.lastEmergency}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12
  },
  name: {
    fontSize: 16,
    fontWeight: "bold"
  },
  last: {
    marginTop: 6,
    color: "#374151"
  }
});
