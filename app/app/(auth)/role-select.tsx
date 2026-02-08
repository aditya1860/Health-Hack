import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useEmergency } from "../context/EmergencyContext";

export default function RoleSelect() {
  const { setRole } = useEmergency();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Select your role</Text>

        <Pressable
          style={styles.btn}
          onPress={async () => {
            await setRole("patient");
            router.replace("/patient-login");
          }}
        >
          <Text style={styles.btnText}>Continue as Patient</Text>
        </Pressable>

        <Pressable
          style={styles.btn}
          onPress={async () => {
            await setRole("doctor");
            router.replace("/doctor-login");
          }}
        >
          <Text style={styles.btnText}>Continue as Doctor</Text>
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

    subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 28,
  },
    btn: {
    backgroundColor: "#dc2626",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 14,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
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
