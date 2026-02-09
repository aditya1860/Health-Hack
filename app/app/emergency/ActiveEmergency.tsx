import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { EmergencyKey } from "./emergencyGuide";
import GuideSlidingPanel from "./GuideSlidingPanel";

interface ActiveEmergencyProps {
  emergencyType: EmergencyKey;
  onCancel: () => void;
}

export default function ActiveEmergency({ emergencyType, onCancel }: ActiveEmergencyProps) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [startTime] = useState(new Date());
  const [helpNotified, setHelpNotified] = useState(false);

  // Track location
  useEffect(() => {
    let sub: Location.LocationSubscription | null = null;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Location Required", "We need your location to send to emergency contacts");
        return;
      }

      sub = await Location.watchPositionAsync(
        { 
          accuracy: Location.Accuracy.High, 
          distanceInterval: 5,
          timeInterval: 3000,
        },
        setLocation
      );
    })();

    return () => sub?.remove();
  }, []);

  // Send location to contacts when available
  useEffect(() => {
    if (location && !helpNotified) {
      sendEmergencyNotification(location);
      setHelpNotified(true);
    }
  }, [location, helpNotified]);

  const sendEmergencyNotification = async (loc: Location.LocationObject) => {
    // TODO: Implement actual API call to send SMS/notification to doctor & emergency contacts
    console.log("Sending emergency notification:", {
      type: emergencyType,
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      timestamp: new Date().toISOString(),
    });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const handleCancelEmergency = () => {
    Alert.alert(
      "Cancel Emergency?",
      "Are you sure you're safe now and want to cancel the emergency?",
      [
        { text: "No, Keep Active", style: "cancel" },
        { 
          text: "Yes, I'm Safe", 
          style: "destructive", 
          onPress: onCancel 
        },
      ]
    );
  };

  const callAmbulance = () => {
    // Linking.openURL("tel:112");
  };

  const callEmergencyContact = () => {
    // Linking.openURL("tel:9999999999");
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Status Header */}
      <View style={styles.statusHeader}>
        <View style={styles.pulseContainer}>
          <View style={styles.pulse} />
        </View>
        <Text style={styles.statusTitle}>HELP IS ON THE WAY</Text>
        <Text style={styles.statusSubtitle}>
          Emergency services have been notified
        </Text>
      </View>

      {/* Help Status Cards */}
      <View style={styles.statusCards}>
        <View style={[styles.statusCard, helpNotified && styles.statusCardActive]}>
          <Text style={styles.statusCardIcon}>
            {helpNotified ? "✓" : "⏳"}
          </Text>
          <Text style={styles.statusCardText}>
            {helpNotified ? "Location Sent" : "Sending Location..."}
          </Text>
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.statusCardText}>Doctor Notified</Text>
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.statusCardText}>Family Alerted</Text>
        </View>
      </View>

      {/* Emergency Time */}
      <View style={styles.timeCard}>
        <Text style={styles.timeLabel}>Emergency Started</Text>
        <Text style={styles.timeValue}>
          {startTime.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Text>
      </View>

      {/* Location Info */}
      {location && (
        <View style={styles.locationCard}>
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>Your Current Location</Text>
            <Text style={styles.locationCoords}>
              {location.coords.latitude.toFixed(6)}, {location.coords.longitude.toFixed(6)}
            </Text>
            <Text style={styles.locationNote}>Updates every 5 meters</Text>
          </View>
        </View>
      )}

      {/* Guidance Panel */}
      <View style={styles.guidanceSection}>
        <Text style={styles.guidanceTitle}>
          What You Should Do Now
        </Text>
        <GuideSlidingPanel type={emergencyType} />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Pressable
          style={styles.callButton}
          onPress={callAmbulance}
        >
          <Text style={styles.callText}>Call Ambulance</Text>
          <Text style={styles.callNumber}>112</Text>
        </Pressable>

        <Pressable
          style={[styles.callButton, styles.contactButton]}
          onPress={callEmergencyContact}
        >
          <Text style={styles.callText}>Call Emergency Contact</Text>
          <Text style={styles.callNumber}>Saved Contact</Text>
        </Pressable>
      </View>

      {/* Cancel Button */}
      <Pressable
        style={styles.cancelButton}
        onPress={handleCancelEmergency}
      >
        <Text style={styles.cancelText}>I'm Safe Now - Cancel Emergency</Text>
      </Pressable>

      {/* Footer Message */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Stay calm. Help is coming. Follow the guidance above.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  statusHeader: {
    backgroundColor: "#d32f2f",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  pulseContainer: {
    position: "relative",
    marginBottom: 12,
  },
  pulse: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    opacity: 0.3,
    top: -5,
    left: -5,
  },
  pulseIcon: {
    fontSize: 50,
  },
  statusTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 6,
    textAlign: "center",
  },
  statusSubtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.95)",
    fontWeight: "500",
    textAlign: "center",
  },
  statusCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
  statusCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 2,
    borderColor: "#f5f5f5",
  },
  statusCardActive: {
    borderColor: "#4caf50",
    backgroundColor: "#f1f8f4",
  },
  statusCardIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  statusCardText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#424242",
    textAlign: "center",
  },
  timeCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  timeLabel: {
    fontSize: 13,
    color: "#757575",
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#d32f2f",
  },
  locationCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#424242",
    marginBottom: 4,
  },
  locationCoords: {
    fontSize: 12,
    color: "#616161",
    fontFamily: "monospace",
    marginBottom: 2,
  },
  locationNote: {
    fontSize: 11,
    color: "#9e9e9e",
    fontStyle: "italic",
  },
  guidanceSection: {
    marginBottom: 20,
  },
  guidanceTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#212121",
    marginBottom: 12,
  },
  actionButtons: {
    gap: 12,
    marginBottom: 20,
  },
  callButton: {
    backgroundColor: "#d32f2f",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  contactButton: {
    backgroundColor: "#1976d2",
  },
  callIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  callText: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  callNumber: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#d32f2f",
    marginBottom: 20,
  },
  cancelText: {
    textAlign: "center",
    color: "#d32f2f",
    fontWeight: "700",
    fontSize: 15,
  },
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#e8f5e9",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#4caf50",
  },
  footerText: {
    fontSize: 14,
    color: "#2e7d32",
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 20,
  },
});