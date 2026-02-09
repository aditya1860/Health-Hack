import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import { mockPatients, mockEmergencies } from "../mockData";
import { mockCheckIns } from "../mockCheckIns";
import { calculateRisk } from "../../../utils/riskEngine";
import RiskBadge from "../RiskBadge";

export default function PatientDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const patientId = Array.isArray(id) ? id[0] : id;

  const patient = mockPatients.find(p => p.id === patientId);
  const emergencies = mockEmergencies.filter(
    e => e.patientId === patientId
  );

  const checkIn = mockCheckIns[patientId];
  const riskResult = checkIn ? calculateRisk(checkIn) : null;

  if (!patient) {
    return (
      <View style={styles.center}>
        <Text>Patient not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.name}>{patient.name}</Text>
      <Text style={styles.meta}>
        Age {patient.age} • {patient.condition}
      </Text>

      {riskResult && (
        <RiskBadge level={riskResult.level} />
      )}

      <Text style={styles.section}>Last Visit</Text>
      <Text>{patient.lastVisit}</Text>

      <Text style={styles.section}>Emergencies</Text>
      {emergencies.length === 0 ? (
        <Text>No emergencies recorded</Text>
      ) : (
        emergencies.map(e => (
          <View key={e.id} style={styles.card}>
            <Text>{e.type}</Text>
            <Text>{e.timestamp}</Text>
            <Text>Severity: {e.severity}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
  },
  meta: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  section: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
    marginTop: 8,
    padding: 12,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
  },
});
