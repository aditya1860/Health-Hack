import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useEmergency } from "../../context/EmergencyContext";
import CommonBackButton from "components/CommonBackButton";

export default function RoleSelect() {
  const { setRole } = useEmergency();

  const handleSelect = async (role: "patient" | "doctor") => {
    await setRole(role);
    router.replace(role === "patient" ? "/patient-login" : "/doctor-login");
  };

  return (
    <View style={styles.container}>

      <CommonBackButton fallbackRoute="/onboarding" />
      {/* Background visuals */}
      <View style={styles.bgCircleOne} />
      <View style={styles.bgCircleTwo} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>CareFast</Text>

        <View style={styles.ecgLine}>
          <View style={styles.dot} />
          <View style={styles.line} />
          <View style={styles.dot} />
        </View>

        <Text style={styles.tagline}>
          Smart • Secure • Digital Healthcare
        </Text>
      </View>

      {/* Main Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Choose your role</Text>
        <Text style={styles.desc}>
          Continue to access healthcare services tailored for you
        </Text>

        {/* Patient */}
        <Pressable
          style={({ pressed }) => [
            styles.patientBtn,
            pressed && styles.pressed,
          ]}
          onPress={() => handleSelect("patient")}
        >
          <Text style={styles.patientText}>Continue as Patient</Text>
          <Text style={styles.subText}>Smarter care. Faster access</Text>
        </Pressable>

        {/* Doctor */}
        <Pressable
          style={({ pressed }) => [
            styles.doctorBtn,
            pressed && styles.pressedOutline,
          ]}
          onPress={() => handleSelect("doctor")}
        >
          <Text style={styles.doctorText}>Continue as Doctor</Text>
          <Text style={styles.subTextOutline}>
            Manage patients & consultations
          </Text>
        </Pressable>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>© 2026 CareFast HealthTech</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingTop: 70,
    paddingBottom: 40,
    justifyContent: "space-between",
  },

  /* Background shapes */
  bgCircleOne: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#fee2e2",
    top: -80,
    right: -80,
    opacity: 0.6,
  },
  bgCircleTwo: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "#fef2f2",
    bottom: -120,
    left: -120,
  },

  /* Header */
  header: {
    alignItems: "center",
  },
  brand: {
    fontSize: 36,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: 0.8,
  },
  ecgLine: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#dc2626",
  },
  line: {
    width: 36,
    height: 2,
    backgroundColor: "#dc2626",
    marginHorizontal: 8,
  },
  tagline: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },

  /* Card */
  card: {
    width: "90%",
    maxWidth: 420,
    backgroundColor: "#ffffff",
    padding: 36,
    borderRadius: 28,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  desc: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 30,
  },

  /* Patient button */
  patientBtn: {
    backgroundColor: "#dc2626",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 18,
    shadowColor: "#dc2626",
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 6,
  },
  patientText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },

  /* Doctor button */
  doctorBtn: {
    borderWidth: 2,
    borderColor: "#dc2626",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
  },
  doctorText: {
    color: "#dc2626",
    fontSize: 18,
    fontWeight: "700",
  },

  /* Subtexts */
  subText: {
    color: "#fee2e2",
    fontSize: 13,
    marginTop: 4,
  },
  subTextOutline: {
    color: "#991b1b",
    fontSize: 13,
    marginTop: 4,
  },

  /* Interactions */
  pressed: {
    transform: [{ scale: 0.97 }],
  },
  pressedOutline: {
    backgroundColor: "#fef2f2",
    transform: [{ scale: 0.97 }],
  },

  footer: {
    fontSize: 12,
    color: "#9ca3af",
  },
});
