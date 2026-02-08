import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function RoleSelect() {
  return (
    <View style={styles.container}>
      <Text style={[styles.sketch, styles.topLeft]}>🩺</Text>
      <Text style={[styles.sketch, styles.topRight]}>💉</Text>
      <Text style={[styles.sketch, styles.bottomLeft]}>🌡️</Text>
      <Text style={[styles.sketch, styles.bottomRight]}>🩹</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Select your role</Text>

        <Pressable
          style={styles.btn}
          onPress={() => router.replace("./patient-login")}
        >
          <Text style={styles.btnText}>Continue as Patient</Text>
        </Pressable>

        <Pressable
          style={styles.btn}
          onPress={() => router.replace("./doctor-login")}
        >
          <Text style={styles.btnText}>Continue as Doctor</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  sketch: {
    position: "absolute",
    fontSize: 120,
    opacity: 0.07,
  },
  topLeft: { top: 40, left: 20 },
  topRight: { top: 60, right: 20 },
  bottomLeft: { bottom: 80, left: 30 },
  bottomRight: { bottom: 60, right: 30 },
  card: {
    width: "85%",
    maxWidth: 360,
    padding: 28,
    borderRadius: 18,
    backgroundColor: "#fff",
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
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
});
