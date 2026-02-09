import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from 'expo-router';

export default function EmergencyCard() {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push('/emergency')}
      activeOpacity={0.9}
    >
      <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>SOS</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Emergency Assistance</Text>
        <Text style={styles.subtitle}>Tap to alert your emergency contacts</Text>
      </View>

      <View style={styles.arrow}>
        <Text style={styles.arrowText}>→</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: "#FEE2E2",
    padding: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    elevation: 2,
    shadowColor: "#DC2626",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 5,
    borderLeftColor: "#EF4444",
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#EF4444",
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: "#DC2626",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#991B1B",
    marginBottom: 2,
  },

  subtitle: {
    fontSize: 12,
    color: "#7F1D1D",
    fontWeight: "500",
  },

  arrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#DC2626",
    alignItems: 'center',
    justifyContent: 'center',
  },

  arrowText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});