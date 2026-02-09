import { View, Text, StyleSheet } from "react-native";

export default function Alerts() {
  return (
    <View style={styles.container}>

      {/* TITLE */}
      <Text style={styles.title}>Alert History</Text>
      <Text style={styles.subtitle}>
        Recent notifications and alerts sent to your contacts
      </Text>

      {/* ALERT LIST */}

      <View style={styles.alertCard}>
        <View style={[styles.bar, { backgroundColor: "#10B981" }]} />
        <View>
          <Text style={styles.alertTitle}>
            Low Risk Status
          </Text>
          <Text style={styles.alertSub}>
            Today at 9:30 AM - Daily check-in completed
          </Text>
        </View>
      </View>

      <View style={styles.alertCard}>
        <View style={[styles.bar, { backgroundColor: "#F59E0B" }]} />
        <View>
          <Text style={styles.alertTitle}>
            Missed Medicine Alert
          </Text>
          <Text style={styles.alertSub}>
            Yesterday at 8:00 PM - Family notified
          </Text>
        </View>
      </View>

      <View style={styles.alertCard}>
        <View style={[styles.bar, { backgroundColor: "#10B981" }]} />
        <View>
          <Text style={styles.alertTitle}>
            Weekly Report Sent
          </Text>
          <Text style={styles.alertSub}>
            3 days ago - Sent to Dr. Smith
          </Text>
        </View>
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },

  subtitle: {
    color: "#6B7280",
    marginBottom: 20,
  },

  alertCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
    elevation: 2,
  },

  bar: {
    width: 4,
    height: "100%",
    marginRight: 14,
    borderRadius: 2,
  },

  alertTitle: {
    fontWeight: "600",
    marginBottom: 4,
  },

  alertSub: {
    color: "#6B7280",
  },
});
