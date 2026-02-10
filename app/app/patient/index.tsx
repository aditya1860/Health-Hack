import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import StatusCard from "./components/StatusCard";
import EmergencyCard from "./components/EmergencyCard";
import CheckInCalendar from "./components/CheckInCalendar";
import { useEmergency } from "../../context/EmergencyContext";
import { getSession } from "../../utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppHeader from "../../components/AppHeader";
import { getPatientDoctor } from "../../utils/connection";


export default function PatientDashboard() {

  const [doctor, setDoctor] = useState<any>(null);

useEffect(() => {
  loadDoctor();
}, []);

const loadDoctor = async () => {
  const data = await getPatientDoctor();
  setDoctor(data);
};


  const router = useRouter();
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const { role, loading: roleLoading } = useEmergency();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("User");
  const [lastCheckIn, setLastCheckIn] = useState<any>(null);
  const [riskLevel, setRiskLevel] = useState("Low Risk");
  const [medicineStreak, setMedicineStreak] = useState(0);
  const [emergencyContacts, setEmergencyContacts] = useState(3);

  useEffect(() => {
    loadDashboardData();
  }, [roleLoading]);

const loadDashboardData = async () => {
  try {
    const session = await getSession();

    if (session && session.name) {
      setUserName(session.name);
    }

    if (session && session.phone) {
      const phone = session.phone;

      const lastCheckInData = await AsyncStorage.getItem(
        `LAST_CHECKIN_${phone}`
      );

      if (lastCheckInData) {
        const parsed = JSON.parse(lastCheckInData);
        setLastCheckIn(parsed);
        setRiskLevel(parsed.riskLevel || "Low Risk");
      } else {
        setLastCheckIn(null);
        setRiskLevel("Low Risk");
      }
    }

    

if (session && session.phone) {
  const phone = session.phone;
  const streakKey = `MEDICINE_STREAK_${phone}`;

  const streakData = await AsyncStorage.getItem(streakKey);
  setMedicineStreak(streakData ? parseInt(streakData) : 0);
}

if (session && session.phone) {
  const phone = session.phone;
  const contactsKey = `EMERGENCY_CONTACTS_${phone}`;

  const contactsData = await AsyncStorage.getItem(contactsKey);
  if (contactsData) {
    const contacts = JSON.parse(contactsData);
    setEmergencyContacts(contacts.length);
  } else {
    setEmergencyContacts(0);
  }
}

  } catch (error) {
    console.error("Error loading dashboard data:", error);
  } finally {
    if (!roleLoading) setLoading(false);
  }
};


  const getLastCheckInText = () => {
    if (!lastCheckIn || !lastCheckIn.timestamp) return "No recent check-in";

    const timestamp = new Date(lastCheckIn.timestamp);
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return timestamp.toLocaleDateString();
  };

  const getRiskColor = () => {
    if (riskLevel.includes("High")) return "#EF4444";
    if (riskLevel.includes("Medium")) return "#F59E0B";
    return "#10B981";
  };

  if (loading || roleLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading your dashboard...</Text>
      </View>
    );
  }

  return (
    
  <View style={{ flex: 1 }}>
    <AppHeader title="Patient Dashboard" />
  
  <View style={styles.actionBar}>
  <TouchableOpacity
    style={styles.connectButton}
    onPress={() => router.push("/patient/connect-doctor")}
  >
    <Text style={styles.connectText}>+ Connect Doctor</Text>
  </TouchableOpacity>
</View>

    
    <ScrollView style={styles.container}>
      <View
        style={[
          styles.wrapper,
          isTablet && styles.wrapperTablet,
        ]}
      >

        {/* WELCOME SECTION */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcome}>Welcome back, {userName}</Text>
          <Text style={styles.sub}>
            Monitor your health, track risks and get help
          </Text>
        </View>

        {/* STATUS CARDS */}
        <View
          style={[
            styles.cardContainer,
            isTablet && styles.cardRowTablet,
          ]}
        >
          <StatusCard
            title="Today's Status"
            value={riskLevel}
            sub={`Last checked: ${getLastCheckInText()}`}
            valueColor={getRiskColor()}
          />

          <StatusCard
            title="Medicine Adherence"
            value={medicineStreak > 0 ? `${medicineStreak} Day Streak` : "Start Today"}
            sub={medicineStreak > 0 ? "Keep it up!" : "Track your medicine"}
          />

          <StatusCard
            title="Emergency Contacts"
            value={`${emergencyContacts} Contact${emergencyContacts !== 1 ? 's' : ''}`}
            sub={emergencyContacts > 0 ? "Ready to alert" : "Add contacts"}
          />
        </View>

        
        {doctor ? (
  <View style={{ padding: 16 }}>
    <Text style={{ fontWeight: "600" }}>You are connected to a Doctor</Text>
    {/* <Text>Doctor ID: {doctor.doctorId}</Text> */}
  </View>
) : (
  <Text style={{ padding: 16, color: "#6B7280" }}>
    No doctor connected yet.
  </Text>
)}

        {/* CHECK-IN CALENDAR */}
        <View style={styles.sectionSpacing}>
          <CheckInCalendar />
        </View>

        {/* EMERGENCY CARD */}
        <View style={styles.sectionSpacing}>
          <EmergencyCard />
        </View>

        {/* PRIMARY ACTION */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => router.push("/patient/checkin")}
        >
          <Text style={styles.primaryBtnText}>Start Health Check</Text>
        </TouchableOpacity>
        

        {/* LAST CHECK-IN DETAILS */}
        <View style={styles.detailsCard}>
  <Text style={styles.detailsTitle}>Latest Health Metrics</Text>

  {lastCheckIn ? (
    <>
      <View style={styles.metricsGrid}>
        {lastCheckIn.sugar && (
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Blood Sugar</Text>
            <Text style={styles.metricValue}>{lastCheckIn.sugar} mg/dL</Text>
          </View>
        )}

        {lastCheckIn.heartRate && (
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Heart Rate</Text>
            <Text style={styles.metricValue}>{lastCheckIn.heartRate} bpm</Text>
          </View>
        )}

        {lastCheckIn.bloodPressure && (
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Blood Pressure</Text>
            <Text style={styles.metricValue}>{lastCheckIn.bloodPressure}</Text>
          </View>
        )}

        {lastCheckIn.oxygen && (
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Oxygen Level</Text>
            <Text style={styles.metricValue}>{lastCheckIn.oxygen}%</Text>
          </View>
        )}
      </View>

      {lastCheckIn.explanation && (
        <View style={styles.explanationBox}>
          <Text style={styles.explanationLabel}>Assessment</Text>
          <Text style={styles.explanation}>{lastCheckIn.explanation}</Text>
        </View>
      )}
    </>
  ) : (
    <Text style={{ color: "#6B7280", marginTop: 8 }}>
      No health data yet. Start your first health check to see insights here.
    </Text>
  )}
</View>


        {/* HEALTH TIP */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>Daily Health Tip</Text>
          <Text style={styles.tipText}>
            Consistent daily check-ins help establish patterns and detect early warning signs. Your 14-day streak tracker above shows your commitment to health monitoring.
          </Text>

          
        </View>
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 12,
    color: "#6B7280",
    fontSize: 14,
  },

  wrapper: {
    padding: 16,
    paddingBottom: 32,
  },

  wrapperTablet: {
    maxWidth: 900,
    alignSelf: "center",
    width: "100%",
    padding: 24,
  },

  welcomeSection: {
    marginTop: 8,
    marginBottom: 20,
  },

  welcome: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
    color: "#111827",
  },

  sub: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },

  cardContainer: {
    flexDirection: "column",
    gap: 12,
    marginBottom: 20,
  },

  cardRowTablet: {
    flexDirection: "row",
  },

  sectionSpacing: {
    marginBottom: 16,
  },

  primaryBtn: {
    backgroundColor: "#2563EB",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
    elevation: 3,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  primaryBtnText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },

  detailsCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 16,
  },

  detailsTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111827",
  },

  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  metric: {
    flex: 1,
    minWidth: "47%",
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#2563EB",
  },

  metricLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
    fontWeight: "500",
  },

  metricValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  explanationBox: {
    marginTop: 16,
    padding: 14,
    backgroundColor: "#F0F9FF",
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#2563EB",
  },

  explanationLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 4,
  },

  explanation: {
    fontSize: 13,
    color: "#1E3A8A",
    lineHeight: 19,
  },

  tipCard: {
    backgroundColor: "#FEF3C7",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
  },

  tipTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#92400E",
    marginBottom: 6,
  },

  tipText: {
    fontSize: 13,
    color: "#78350F",
    lineHeight: 19,
  },

  actionBar: {
  backgroundColor: "#fff",
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: "#E5E7EB",
  alignItems: "flex-end",
},

connectButton: {
  borderWidth: 1,
  borderColor: "#2563EB",
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 6,
},

connectText: {
  color: "#2563EB",
  fontSize: 13,
  fontWeight: "600",
},

});