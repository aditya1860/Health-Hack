import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from "react-native";
import { useState, useEffect } from "react";
import { EmergencyKey } from "./emergencyGuide";


interface EmergencyProtocolProps {
  emergencyType: EmergencyKey;
  onBack?: () => void;
}

const EMERGENCY_PROTOCOLS = {
  heart: {
    title: "Heart Attack Emergency Protocol",
    immediateActions: [
      "Sit down immediately in a comfortable position",
      "Loosen any tight clothing around neck and chest",
      "If you have aspirin and are not allergic, chew one 325mg tablet",
      "Stay calm and breathe slowly",
      "Keep phone nearby for updates",
    ],
    whatNotToDo: [
      "Don't ignore the symptoms or wait to see if they go away",
      "Don't eat or drink anything except aspirin",
      "Don't drive yourself to the hospital",
      "Don't lie completely flat",
    ],
    waitForHelp: [
      "Stay seated in a comfortable position",
      "Keep your phone within reach",
      "Unlock your door if possible for emergency responders",
      "Note the time symptoms started",
    ],
  },
  fall: {
    title: "Fall / Injury Emergency Protocol",
    immediateActions: [
      "Stay still and assess if you can move safely",
      "Don't try to get up immediately if you feel pain",
      "Apply pressure to any bleeding wounds with clean cloth",
      "Keep the injured area still and elevated if possible",
      "Stay calm and breathe slowly",
    ],
    whatNotToDo: [
      "Don't move if you suspect head, neck, or back injury",
      "Don't remove objects embedded in wounds",
      "Don't try to stand up if you feel dizzy or in severe pain",
      "Don't leave a bleeding wound uncovered",
    ],
    waitForHelp: [
      "Keep the injured area still",
      "Continue applying pressure to bleeding wounds",
      "Keep warm with a blanket if available",
      "Stay alert and keep talking if someone is with you",
    ],
  },
  blood: {
    title: "Bleeding Emergency Protocol",
    immediateActions: [
      "Apply firm, direct pressure to the wound with clean cloth",
      "Sit or lie down to prevent fainting",
      "Keep the bleeding area elevated above heart level if possible",
      "Don't remove the cloth if it soaks through - add more on top",
      "Stay calm and breathe slowly",
    ],
    whatNotToDo: [
      "Don't remove objects embedded in the wound",
      "Don't peek at the wound - maintain constant pressure",
      "Don't use a tourniquet unless trained to do so",
      "Don't eat or drink anything",
    ],
    waitForHelp: [
      "Continue applying firm pressure to the wound",
      "Keep the area elevated",
      "Stay seated or lying down",
      "Note how long you've been bleeding",
    ],
  },
  breathing: {
    title: "Breathing Emergency Protocol",
    immediateActions: [
      "Sit upright in a comfortable position",
      "Loosen any tight clothing around neck and chest",
      "Try to breathe slowly through your nose, out through your mouth",
      "Use your inhaler if you have one prescribed",
      "Stay calm - panic makes breathing harder",
    ],
    whatNotToDo: [
      "Don't lie down flat - stay upright",
      "Don't breathe into a paper bag",
      "Don't try to force deep breaths - breathe naturally",
      "Don't ignore worsening symptoms",
    ],
    waitForHelp: [
      "Stay seated upright",
      "Focus on slow, controlled breathing",
      "Keep your inhaler nearby if you have one",
      "Try to stay as calm as possible",
    ],
  },
  burn: {
    title: "Burn Emergency Protocol",
    immediateActions: [
      "Remove from heat source immediately",
      "Cool the burn with cool (not ice-cold) running water for 10-20 minutes",
      "Remove jewelry and tight clothing from burned area",
      "Cover loosely with clean, dry cloth",
      "Don't apply ice, butter, or ointments",
    ],
    whatNotToDo: [
      "Don't use ice or ice-cold water",
      "Don't apply butter, oils, or ointments",
      "Don't break any blisters that form",
      "Don't remove clothing stuck to the burn",
    ],
    waitForHelp: [
      "Keep the burn covered with clean, dry cloth",
      "Keep the person warm with blankets on unburned areas",
      "Elevate the burned area if possible",
      "Stay calm and monitor for shock symptoms",
    ],
  },
};

export default function EmergencyProtocol({ emergencyType, onBack }: EmergencyProtocolProps) {
  const [activeTab, setActiveTab] = useState<"immediate" | "not" | "wait">("immediate");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const protocol = EMERGENCY_PROTOCOLS[emergencyType];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "immediate":
        return protocol.immediateActions;
      case "not":
        return protocol.whatNotToDo;
      case "wait":
        return protocol.waitForHelp;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <View style={styles.alertIcon}>
              <Text style={styles.alertIconText}>!</Text>
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>EMERGENCY MODE</Text>
              <Text style={styles.headerSubtitle}>{protocol.title}</Text>
            </View>
          </View>
          <View style={styles.timerContainer}>
            <Text style={styles.timerIcon}>🕐</Text>
            <View>
              <Text style={styles.timerText}>{formatTime(timeElapsed)}</Text>
              <Text style={styles.timerLabel}>Time elapsed</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Tabs */}
        <View style={styles.tabs}>
          <Pressable
            style={[styles.tab, activeTab === "immediate" && styles.tabActive]}
            onPress={() => setActiveTab("immediate")}
          >
            <Text style={[styles.tabText, activeTab === "immediate" && styles.tabTextActive]}>
              1. Immediate Actions
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === "not" && styles.tabActive]}
            onPress={() => setActiveTab("not")}
          >
            <Text style={[styles.tabText, activeTab === "not" && styles.tabTextActive]}>
              2. What NOT to Do
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === "wait" && styles.tabActive]}
            onPress={() => setActiveTab("wait")}
          >
            <Text style={[styles.tabText, activeTab === "wait" && styles.tabTextActive]}>
              3. Wait for Help
            </Text>
          </Pressable>
        </View>

        {/* Action Cards */}
        <View style={styles.actionsContainer}>
          <View style={styles.actionsHeader}>
            <Text style={styles.actionsHeaderIcon}>✓</Text>
            <Text style={styles.actionsHeaderText}>
              {activeTab === "immediate" && "Immediate Actions - Do These NOW"}
              {activeTab === "not" && "What NOT to Do - Avoid These"}
              {activeTab === "wait" && "Wait for Help - Stay Safe"}
            </Text>
          </View>
          <View style={styles.actionsList}>
            {getTabContent().map((action, index) => (
              <View key={index} style={styles.actionItem}>
                <View style={styles.actionNumber}>
                  <Text style={styles.actionNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.actionText}>{action}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Emergency Status */}
        <View style={styles.statusCard}>
          <Text style={styles.cardTitle}>Emergency Status</Text>
          <View style={styles.statusItem}>
            <Text style={styles.statusIcon}>✓</Text>
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitle}>Family Alerts</Text>
              <Text style={styles.statusSubtitle}>Sent to 3 contacts</Text>
            </View>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusIcon}>✓</Text>
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitle}>Clinic Notification</Text>
              <Text style={styles.statusSubtitle}>Nearest clinic alerted</Text>
            </View>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusIcon}>📍</Text>
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitle}>Location Shared</Text>
              <Text style={styles.statusSubtitle}>Noida , Uttar Pradesh</Text>
            </View>
          </View>
          <Pressable style={styles.helpButton}>
            <Text style={styles.helpButtonText}>Help is on the way</Text>
          </Pressable>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.contactsCard}>
          <Text style={styles.cardTitle}>Emergency Contacts</Text>
          <Pressable style={[styles.contactButton, styles.contactButtonGreen]}>
            <Text style={styles.contactButtonIcon}>📞</Text>
            <Text style={styles.contactButtonText}>Call Dad</Text>
          </Pressable>
          <Pressable style={[styles.contactButton, styles.contactButtonBlue]}>
            <Text style={styles.contactButtonIcon}>📞</Text>
            <Text style={styles.contactButtonText}>Call Dr. Jain</Text>
          </Pressable>
          <Pressable style={[styles.contactButton, styles.contactButtonRed]}>
            <Text style={styles.contactButtonIcon}>📞</Text>
            <Text style={styles.contactButtonText}>Call 112 (Ambulance)</Text>
          </Pressable>
        </View>
        {/* Exit Emergency */}


{onBack && (
  <View style={styles.exitContainer}>
    <Pressable
      style={styles.exitButton}
      onPress={() => {
        Alert.alert(
          "Exit Emergency Mode",
          "Are you sure you are safe now?",
          [
            { text: "Stay in Emergency", style: "cancel" },
            { text: "Yes, I'm Safe", onPress: onBack },
          ]
        );
      }}
    >
      <Text style={styles.exitButtonText}>I feel safe now</Text>
    </Pressable>
  </View>
)}


        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DC2626",
  },
  header: {
    backgroundColor: "#B91C1C",
    paddingBottom: 16,
  },
  headerTop: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    borderBottomWidth: 3,
    borderBottomColor: "#FFFFFF",
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  alertIconText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#DC2626",
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#FEE2E2",
    fontWeight: "500",
    marginTop: 2,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  timerIcon: {
    fontSize: 20,
  },
  timerText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  timerLabel: {
    fontSize: 10,
    color: "#FEE2E2",
    fontWeight: "500",
  },
  content: {
    flex: 1,
  },
  tabs: {
    flexDirection: "row",
    gap: 8,
    padding: 16,
  },
  tab: {
    flex: 1,
    backgroundColor: "#FECACA",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#FFFFFF",
  },
  tabText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#991B1B",
    textAlign: "center",
  },
  tabTextActive: {
    color: "#DC2626",
  },
  actionsContainer: {
    backgroundColor: "#10B981",
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  actionsHeader: {
    backgroundColor: "#059669",
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  actionsHeaderIcon: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  actionsHeaderText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    flex: 1,
  },
  actionsList: {
    padding: 12,
    gap: 10,
  },
  actionItem: {
    backgroundColor: "#D1FAE5",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  actionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  actionNumberText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  actionText: {
    fontSize: 14,
    color: "#064E3B",
    fontWeight: "600",
    flex: 1,
    lineHeight: 20,
  },
  statusCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    gap: 14,
    marginBottom: 16,
  },
  contactsCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#DC2626",
    marginBottom: 4,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statusIcon: {
    fontSize: 18,
    width: 24,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
  },
  statusSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  helpButton: {
    backgroundColor: "#10B981",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  helpButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  contactButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  contactButtonGreen: {
    backgroundColor: "#10B981",
  },
  contactButtonBlue: {
    backgroundColor: "#2563EB",
  },
  contactButtonRed: {
    backgroundColor: "#DC2626",
  },
  contactButtonIcon: {
    fontSize: 16,
  },
  contactButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  bottomPadding: {
    height: 20,
  },

  exitContainer: {
  marginTop: 24,
  paddingHorizontal: 16,
},

exitButton: {
  backgroundColor: "#10B981", // calming green
  paddingVertical: 16,
  borderRadius: 14,
  alignItems: "center",
},

exitButtonText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "700",
},

});