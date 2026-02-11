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
import { calculateRisk, mapCheckInToRiskInput } from "../../../utils/riskEngine";
import RiskBadge from "../RiskBadge";

export default function PatientDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const patientId = Array.isArray(id) ? id[0] : id;

  const patient = mockPatients.find(p => p.id === patientId);
  const emergencies = mockEmergencies.filter(
    e => e.patientId === patientId
  );

  const checkIn = mockCheckIns[patientId];
const riskResult = checkIn
  ? calculateRisk(mapCheckInToRiskInput(checkIn))
  : null;

  if (!patient) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 16 }}>Patient not found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Card */}
      <View style={styles.headerCard}>
        <Text style={styles.name}>{patient.name}</Text>
        <Text style={styles.meta}>
          Age {patient.age} • {patient.condition}
        </Text>

        {riskResult && (
          <View style={{ marginTop: 10 }}>
            <RiskBadge level={riskResult.level} />
          </View>
        )}
      </View>

      {/* Visit Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Last Visit</Text>
        <Text style={styles.sectionValue}>
          {patient.lastVisit}
        </Text>
      </View>

      {/* Emergency Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Emergencies</Text>

        {emergencies.length === 0 ? (
          <Text style={styles.emptyText}>
            No emergencies recorded
          </Text>
        ) : (
          emergencies.map(e => (
            <View key={e.id} style={styles.emergencyCard}>
              <Text style={styles.emergencyType}>
                {e.type}
              </Text>
              <Text style={styles.emergencyMeta}>
                {e.timestamp}
              </Text>
              <Text style={styles.emergencyMeta}>
                Severity: {e.severity}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  headerCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  meta: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },

  sectionCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 10,
  },

  sectionValue: {
    fontSize: 14,
    color: "#374151",
  },

  emergencyCard: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },

  emergencyType: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  emergencyMeta: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  emptyText: {
    fontSize: 13,
    color: "#9CA3AF",
  },
});
