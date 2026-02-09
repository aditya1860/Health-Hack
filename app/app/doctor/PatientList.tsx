import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";

import { mockPatients } from "./mockData";
import { mockCheckIns } from "./mockCheckIns";
import { calculateRisk } from "../../utils/riskEngine";
import RiskBadge from "./RiskBadge";


/* ===================== COMPONENT ===================== */

const PatientList = () => {
  const router = useRouter();

  const renderPatient = ({ item }: { item: any }) => {
    const checkIn = mockCheckIns[item.id];
    const riskResult = checkIn ? calculateRisk(checkIn) : null;
    const badgeLevel = riskResult?.level ?? null;


    return (
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/doctor/patients/[id]",
            params: { id: item.id },
          })
        }
        style={({ pressed }) => [
          styles.patientCard,
          pressed && styles.cardPressed,
        ]}
      >
        {/* Header */}
        <View style={styles.patientHeader}>
          <View style={styles.patientInfo}>
            <Text style={styles.patientName}>{item.name}</Text>
            <Text style={styles.patientDetails}>
              Age {item.age} • {item.condition}
            </Text>
          </View>

          {badgeLevel && (
            <RiskBadge level={badgeLevel} />
          )}
        </View>

        {/* Footer */}
        <View style={styles.patientFooter}>
          <View>
            <Text style={styles.footerLabel}>Last Visit</Text>
            <Text style={styles.footerValue}>{item.lastVisit}</Text>
          </View>

          {item.monitoring && (
            <View style={styles.monitoringBadge}>
              <View style={styles.monitoringDot} />
              <Text style={styles.monitoringText}>
                Active Monitoring
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mockPatients}
        renderItem={renderPatient}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PatientList;

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  patientCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardPressed: {
    backgroundColor: "#F1F5F9",
  },
  patientHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  patientInfo: {
    flex: 1,
    paddingRight: 12,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  patientDetails: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
  patientFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  footerLabel: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  footerValue: {
    fontSize: 13,
    fontWeight: "500",
    color: "#4B5563",
  },
  monitoringBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  monitoringDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#3B82F6",
    marginRight: 6,
  },
  monitoringText: {
    fontSize: 11,
    color: "#1E40AF",
    fontWeight: "500",
  },
});
