import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function EmergencyCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Emergency Assistance</Text>

      <Text style={styles.sub}>
        Press this button if you need immediate medical help
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.btnText}>
          I NEED{"\n"}HELP NOW
        </Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        This will alert your emergency contacts
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 260,
    backgroundColor: "#FEE2E2",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },

  title: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  sub: {
    textAlign: "center",
    marginBottom: 20,
    color: "#7F1D1D",
  },

  button: {
    backgroundColor: "#EF4444",
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  btnText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },

  footer: {
    textAlign: "center",
    fontSize: 12,
  },
});
