import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { EmergencyKey } from "./emergencyGuide";

const EMERGENCY_TYPES: { key: EmergencyKey; label: string; icon: string; color: string }[] = [
  { key: "heart", label: "Heart Attack", icon: "💔", color: "#DC2626" },
  { key: "fall", label: "Fall / Injury", icon: "🤕", color: "#EA580C" },
  { key: "blood", label: "Bleeding", icon: "🩸", color: "#C026D3" },
  { key: "breathing", label: "Can't Breathe", icon: "😮‍💨", color: "#2563EB" },
  { key: "burn", label: "Burn", icon: "🔥", color: "#D97706" },
];

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

interface EmergencyGreetingProps {
  onSelectType?: (type: EmergencyKey) => void;
}

export default function EmergencyGreeting({ onSelectType }: EmergencyGreetingProps) {
  const [selectedEmergency, setSelectedEmergency] = useState<EmergencyKey | null>(null);
  const [activeTab, setActiveTab] = useState<"immediate" | "not" | "wait">("immediate");
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (selectedEmergency) {
      const interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [selectedEmergency]);

  const handleSelectType = (type: EmergencyKey) => {
    setSelectedEmergency(type);
    if (onSelectType) {
      onSelectType(type);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTabContent = () => {
    if (!selectedEmergency) return [];
    const protocol = EMERGENCY_PROTOCOLS[selectedEmergency];
    switch (activeTab) {
      case "immediate":
        return protocol.immediateActions;
      case "not":
        return protocol.whatNotToDo;
      case "wait":
        return protocol.waitForHelp;
    }
  };

  // Selection Screen
  if (!selectedEmergency) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>What's happening?</Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {EMERGENCY_TYPES.map((type) => (
            <Pressable
              key={type.key}
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: type.color },
                pressed && styles.buttonPressed
              ]}
              onPress={() => handleSelectType(type.key)}
            >
              <Text style={styles.icon}>{type.icon}</Text>
              <Text style={styles.buttonText}>{type.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>🚨 Help will be notified immediately</Text>
        </View>
      </View>
    );
  }

  // Emergency Protocol Screen
  const protocol = EMERGENCY_PROTOCOLS[selectedEmergency];

  return (
    <View style={styles.protocolContainer}>
      {/* Header */}
      <View style={styles.protocolHeader}>
        <View style={styles.headerLeft}>
          <View style={styles.alertIcon}>
            <Text style={styles.alertIconText}>!</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>EMERGENCY MODE</Text>
            <Text style={styles.headerSubtitle}>{protocol.title}</Text>
          </View>
        </View>
        <View style={styles.timerContainer}>
          <View style={styles.timerIcon}>
            <Text style={styles.timerIconText}>🕐</Text>
          </View>
          <View>
            <Text style={styles.timerText}>{formatTime(timeElapsed)}</Text>
            <Text style={styles.timerLabel}>Time elapsed</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.leftColumn}>
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
        </View>

        <View style={styles.rightColumn}>
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
                <Text style={styles.statusSubtitle}>123 Main St, Mumbai</Text>
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
              <Text style={styles.contactButtonText}>Call Jane Doe (Spouse)</Text>
            </Pressable>
            <Pressable style={[styles.contactButton, styles.contactButtonBlue]}>
              <Text style={styles.contactButtonIcon}>📞</Text>
              <Text style={styles.contactButtonText}>Call Dr. Smith</Text>
            </Pressable>
            <Pressable style={[styles.contactButton, styles.contactButtonRed]}>
              <Text style={styles.contactButtonIcon}>📞</Text>
              <Text style={styles.contactButtonText}>Call 108 (Ambulance)</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Selection Screen Styles
  container: {
    flex: 1,
    backgroundColor: "#FFE4E6",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: "#FFE4E6",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 16,
  },
  button: {
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: 90,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  icon: {
    fontSize: 40,
    marginRight: 20,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    flex: 1,
  },
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: "#FEF3C7",
    borderTopWidth: 3,
    borderTopColor: "#F59E0B",
  },
  footerText: {
    fontSize: 16,
    color: "#92400E",
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 22,
  },

  // Protocol Screen Styles
  protocolContainer: {
    flex: 1,
    backgroundColor: "#DC2626",
  },
  protocolHeader: {
    backgroundColor: "#B91C1C",
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "#FFFFFF",
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
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#FEE2E2",
    fontWeight: "500",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timerIcon: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  timerIconText: {
    fontSize: 24,
  },
  timerText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  timerLabel: {
    fontSize: 12,
    color: "#FEE2E2",
    fontWeight: "500",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: "row",
    padding: 20,
    gap: 20,
  },
  leftColumn: {
    flex: 2,
    gap: 16,
  },
  rightColumn: {
    flex: 1,
    gap: 16,
  },
  tabs: {
    flexDirection: "row",
    gap: 12,
  },
  tab: {
    flex: 1,
    backgroundColor: "#FECACA",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#FFFFFF",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#991B1B",
  },
  tabTextActive: {
    color: "#DC2626",
  },
  actionsContainer: {
    backgroundColor: "#10B981",
    borderRadius: 12,
    overflow: "hidden",
  },
  actionsHeader: {
    backgroundColor: "#059669",
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionsHeaderIcon: {
    fontSize: 24,
    color: "#FFFFFF",
  },
  actionsHeaderText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    flex: 1,
  },
  actionsList: {
    padding: 16,
    gap: 12,
  },
  actionItem: {
    backgroundColor: "#D1FAE5",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  actionNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
  },
  actionNumberText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  actionText: {
    fontSize: 16,
    color: "#064E3B",
    fontWeight: "600",
    flex: 1,
    lineHeight: 22,
  },
  statusCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    gap: 16,
  },
  contactsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    gap: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#DC2626",
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  statusIcon: {
    fontSize: 20,
    width: 24,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
  },
  statusSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  helpButton: {
    backgroundColor: "#10B981",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  helpButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  contactButton: {
    paddingVertical: 16,
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
    fontSize: 18,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});