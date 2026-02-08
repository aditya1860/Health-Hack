import { View, Text, StyleSheet, Pressable } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { getSession, logout } from "../../utils/storage";

export default function DoctorDashboard() {
  const router = useRouter();

  // 🔐 OUR PART: protect route
  useEffect(() => {
    const checkAuth = async () => {
      const user = await getSession();
      if (!user || user.role !== "doctor") {
        router.replace("/doctor-login");
      }
    };
    checkAuth();
  }, []);

  // 🔐 OUR PART: logout
  const handleLogout = async () => {
    await logout();
    router.replace("/role-select");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctor Dashboard</Text>

      {/* ===== EXISTING DASHBOARD (UNCHANGED) ===== */}

      <Pressable
        onPress={() => router.push("/doctor/patients")}
        style={({ hovered }) => [
          styles.card,
          hovered && styles.cardHover,
        ]}
      >
        {({ hovered }) => (
          <>
            <Text
              style={[
                styles.cardTitle,
                hovered && styles.cardTitleHover,
              ]}
            >
              Patients
            </Text>
            <Text
              style={[
                styles.cardSub,
                hovered && styles.cardSubHover,
              ]}
            >
              View and manage patients
            </Text>
          </>
        )}
      </Pressable>

      <Pressable
        onPress={() => router.push("/doctor/appointments")}
        style={({ hovered }) => [
          styles.card,
          hovered && styles.cardHover,
        ]}
      >
        {({ hovered }) => (
          <>
            <Text
              style={[
                styles.cardTitle,
                hovered && styles.cardTitleHover,
              ]}
            >
              Appointments
            </Text>
            <Text
              style={[
                styles.cardSub,
                hovered && styles.cardSubHover,
              ]}
            >
              Upcoming consultations
            </Text>
          </>
        )}
      </Pressable>

      <Pressable
        onPress={() => router.push("/doctor/emergencies")}
        style={({ hovered }) => [
          styles.card,
          hovered && styles.dangerHover,
        ]}
      >
        {({ hovered }) => (
          <>
            <Text
              style={[
                styles.dangerTitle,
                hovered && styles.dangerTitleHover,
              ]}
            >
              Emergencies
            </Text>
            <Text style={styles.cardSub}>
              Emergency history & alerts
            </Text>
          </>
        )}
      </Pressable>

      <Pressable
        onPress={() => router.push("/doctor/analytics")}
        style={({ hovered }) => [
          styles.card,
          hovered && styles.cardHover,
        ]}
      >
        {({ hovered }) => (
          <>
            <Text
              style={[
                styles.cardTitle,
                hovered && styles.cardTitleHover,
              ]}
            >
              Analytics
            </Text>
            <Text
              style={[
                styles.cardSub,
                hovered && styles.cardSubHover,
              ]}
            >
              Patient risk overview
            </Text>
          </>
        )}
      </Pressable>

      {/* ===== OUR PART: LOGOUT BUTTON ===== */}
      <Pressable onPress={handleLogout} style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const PRIMARY = "#2563EB";
const PRIMARY_LIGHT = "#EEF2FF";
const PRIMARY_TEXT_HOVER = "#1D4ED8";

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#F1F5F9",
    minHeight: "100%",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: PRIMARY,
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    cursor: "pointer",
  },
  cardHover: {
    backgroundColor: PRIMARY_LIGHT,
  },
  dangerHover: {
    backgroundColor: "#FEF2F2",
    borderColor: "#DC2626",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: PRIMARY,
  },
  cardTitleHover: {
    color: PRIMARY_TEXT_HOVER,
  },
  cardSub: {
    marginTop: 6,
    color: "#475569",
  },
  cardSubHover: {
    color: "#1E40AF",
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#DC2626",
  },
  dangerTitleHover: {
    color: "#991B1B",
  },
  logoutBtn: {
    marginTop: 30,
    backgroundColor: "#DC2626",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
