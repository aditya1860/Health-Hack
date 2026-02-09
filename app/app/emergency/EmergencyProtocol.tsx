import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from "react-native";
import { useState, useEffect } from "react";
import { EmergencyKey } from "./emergencyGuide";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSession } from "../../utils/storage";
import CommonBackButton from "../../components/CommonBackButton";
import { router } from "expo-router";




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

  const handleExitEmergency = async () => {
  const session = await getSession();

  if (session?.phone) {
    const phone = session.phone;
    const key = `EMERGENCY_LOG_${phone}`;

    const data = await AsyncStorage.getItem(key);
    if (data) {
      const logs = JSON.parse(data);

      for (let i = logs.length - 1; i >= 0; i--) {
        if (!logs[i].endedAt) {
          logs[i].endedAt = new Date().toISOString();
          break;
        }
      }

      await AsyncStorage.setItem(key, JSON.stringify(logs));
    }

    if (session.doctorPhone) {
      const notifKey = `DOCTOR_NOTIFICATIONS_${session.doctorPhone}`;
      const existing = await AsyncStorage.getItem(notifKey);
      const notifications = existing ? JSON.parse(existing) : [];

      notifications.unshift({
        id: Date.now().toString(),
        type: "EMERGENCY_RESOLVED",
        patientPhone: session.phone,
        patientName: session.name || "Patient",
        resolvedAt: new Date().toISOString(),
        message: "Patient exited emergency mode and marked themselves safe",
        read: false,
      });

      await AsyncStorage.setItem(
        notifKey,
        JSON.stringify(notifications.slice(0, 50))
      );
    }
  }

  if (onBack) {
    onBack();
  } else {
    router.replace("/");
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
              <Text style={styles.headerTitle}>Emergency Mode</Text>
              <Text style={styles.headerSubtitle}>{protocol.title}</Text>
            </View>
          </View>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{formatTime(timeElapsed)}</Text>
            <Text style={styles.timerLabel}>elapsed</Text>
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
              Immediate Actions
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === "not" && styles.tabActive]}
            onPress={() => setActiveTab("not")}
          >
            <Text style={[styles.tabText, activeTab === "not" && styles.tabTextActive]}>
              What NOT to Do
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === "wait" && styles.tabActive]}
            onPress={() => setActiveTab("wait")}
          >
            <Text style={[styles.tabText, activeTab === "wait" && styles.tabTextActive]}>
              Wait for Help
            </Text>
          </Pressable>
        </View>

        <CommonBackButton color="#F9FAFB" />


        

        {/* Action Cards */}
        <View style={styles.actionsContainer}>
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
          <View style={styles.divider} />
          <View style={styles.statusItem}>
            <View style={styles.statusIconContainer}>
              <Text style={styles.statusIcon}>✓</Text>
            </View>
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitle}>Family Alerts Sent</Text>
              <Text style={styles.statusSubtitle}>3 contacts notified</Text>
            </View>
          </View>
          <View style={styles.statusItem}>
            <View style={styles.statusIconContainer}>
              <Text style={styles.statusIcon}>✓</Text>
            </View>
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitle}>Clinic Notified</Text>
              <Text style={styles.statusSubtitle}>Nearest clinic alerted</Text>
            </View>
          </View>
          <View style={styles.statusItem}>
            <View style={styles.statusIconContainer}>
              <Text style={styles.statusIcon}>📍</Text>
            </View>
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitle}>Location Shared</Text>
              <Text style={styles.statusSubtitle}>Noida, Uttar Pradesh</Text>
            </View>
          </View>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.contactsCard}>
          <Text style={styles.cardTitle}>Emergency Contacts</Text>
          <View style={styles.divider} />
          <Pressable style={styles.contactButton}>
            <Text style={styles.contactButtonIcon}>📞</Text>
            <Text style={styles.contactButtonText}>Call Dad</Text>
          </Pressable>
          <Pressable style={styles.contactButton}>
            <Text style={styles.contactButtonIcon}>📞</Text>
            <Text style={styles.contactButtonText}>Call Dr. Jain</Text>
          </Pressable>
          <Pressable style={styles.contactButton}>
            <Text style={styles.contactButtonIcon}>📞</Text>
            <Text style={styles.contactButtonText}>Call 112 (Ambulance)</Text>
          </Pressable>
        </View>

        {/* Exit Emergency */}
        <Pressable
          style={styles.exitButton}
          onPress={() => {
            Alert.alert(
              "Exit Emergency Mode",
              "Are you sure you are safe now?",
              [
                { text: "Stay in Emergency", style: "cancel" },
{
  text: "Yes, I'm Safe",
  onPress: () => {
    setTimeout(() => {
      handleExitEmergency();
    }, 0);
  },
},
              ]
            );
          }}
        >
          <Text style={styles.exitButtonText}>I Feel Safe Now</Text>
        </Pressable>

        

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#DC2626",
    paddingBottom: 20,
    paddingTop: 16,
  },
  headerTop: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  alertIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  alertIconText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#DC2626",
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#FEE2E2",
    fontWeight: "400",
    marginTop: 2,
  },
  timerContainer: {
    alignItems: "flex-end",
  },
  timerText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  timerLabel: {
    fontSize: 11,
    color: "#FEE2E2",
    fontWeight: "400",
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  tabs: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  tab: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tabActive: {
    backgroundColor: "#DC2626",
    borderColor: "#DC2626",
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    textAlign: "center",
  },
  tabTextActive: {
    color: "#FFFFFF",
  },
  actionsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  actionsList: {
    gap: 12,
  },
  actionItem: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  actionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  actionNumberText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  actionText: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "400",
    flex: 1,
    lineHeight: 24,
  },
  statusCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  contactsCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginBottom: 16,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  statusIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  statusIcon: {
    fontSize: 18,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 2,
  },
  statusSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "400",
  },
  contactButton: {
    backgroundColor: "#DC2626",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 12,
  },
  contactButtonIcon: {
    fontSize: 18,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  exitButton: {
    backgroundColor: "#10B981",
    marginHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  exitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomPadding: {
    height: 40,
  },
});