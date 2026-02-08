import { Text, StyleSheet } from "react-native";

export default function DoctorAckBadge({ acknowledged }: any) {
  if (!acknowledged) return null;

  return <Text style={styles.badge}>✔ Doctor Acknowledged</Text>;
}

const styles = StyleSheet.create({
  badge: {
    color: "#16A34A",
    fontWeight: "bold",
    marginTop: 6
  }
});
