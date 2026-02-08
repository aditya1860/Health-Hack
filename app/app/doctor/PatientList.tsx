import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput
} from "react-native";
import { useState } from "react";
import { patients } from "./mockData";
import RiskBadge from "./RiskBadge";

export default function PatientList() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] =
    useState<"ALL" | "HIGH" | "MEDIUM" | "LOW">("ALL");

  const filtered = patients.filter(p => {
    const matchesName = p.name
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesRisk =
      filter === "ALL" || p.risk === filter;

    return matchesName && matchesRisk;
  });

  return (
    <>
      <TextInput
        placeholder="Search patient..."
        value={query}
        onChangeText={setQuery}
        style={styles.search}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              item.risk === "HIGH" && styles.highRisk
            ]}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text>Age: {item.age}</Text>

            <RiskBadge risk={item.risk as any} />

            <Text style={styles.last}>
              Last Emergency: {item.lastEmergency}
            </Text>

            <Text style={styles.assigned}>
              Assigned to: {item.assignedDoctor ?? "—"}
            </Text>

            <TextInput
              placeholder="Doctor notes..."
              defaultValue={item.notes}
              style={styles.notes}
              multiline
            />

            <TouchableOpacity
              style={styles.callBtn}
              onPress={() =>
                Alert.alert("Calling", `Calling ${item.name}...`)
              }
            >
              <Text style={styles.callText}>📞 Call Patient</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  );
}
const styles = StyleSheet.create({
  search: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  },

  card: {
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12
  },

  highRisk: {
    borderLeftWidth: 5,
    borderLeftColor: "#DC2626"
  },

  name: {
    fontSize: 16,
    fontWeight: "bold"
  },

  last: {
    marginTop: 6,
    color: "#374151"
  },

  assigned: {
    marginTop: 6,
    fontStyle: "italic",
    color: "#2563EB"
  },

  notes: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    padding: 8,
    marginTop: 8,
    backgroundColor: "#FFFFFF"
  },

  callBtn: {
    marginTop: 8,
    backgroundColor: "#2563EB",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center"
  },

  callText: {
    color: "#FFFFFF",
    fontWeight: "600"
  }
});
