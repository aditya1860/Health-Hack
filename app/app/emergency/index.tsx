import { Linking } from "react-native";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";

export default function Emergency() {
  const [tab, setTab] = useState(1);

  return (
    <View style={styles.container}>

      {/* TAB BUTTONS */}
      <View style={styles.tabRow}>

        <TabBtn
          label="1. Immediate Actions"
          active={tab === 1}
          onPress={() => setTab(1)}
        />

        <TabBtn
          label="2. What NOT to Do"
          active={tab === 2}
          onPress={() => setTab(2)}
        />

        <TabBtn
          label="3. Wait for Help"
          active={tab === 3}
          onPress={() => setTab(3)}
        />

      </View>

      <View style={styles.mainRow}>

        {/* LEFT CONTENT */}
        <ScrollView style={{ flex: 1 }}>

          {tab === 1 && <ImmediateActions />}
          {tab === 2 && <WhatNotToDo />}
          {tab === 3 && <WaitForHelp />}

        </ScrollView>

        {/* RIGHT PANEL */}
        <View style={styles.rightPanel}>

          <Text style={styles.panelTitle}>
            Emergency Status
          </Text>

          <StatusItem
            title="Family Alerts"
            sub="Sent to 3 contacts"
          />

          <StatusItem
            title="Clinic Notification"
            sub="Nearest clinic alerted"
          />

          <StatusItem
            title="Location Shared"
            sub="123 Main St, Mumbai"
          />

          <TouchableOpacity style={styles.helpBtn}>
            <Text style={styles.helpText}>
              Help is on the way
            </Text>
          </TouchableOpacity>

          {/* CONTACTS */}
          <Text style={styles.panelTitle}>
            Emergency Contacts
          </Text>

          <ContactBtn
  label="Call Jane Doe (Spouse)"
  color="#10B981"
  phone="+919876543210"
/>

<ContactBtn
  label="Call Dr. Smith"
  color="#2563EB"
  phone="+919876543211"
/>

<ContactBtn
  label="Call 108 (Ambulance)"
  color="#EF4444"
  phone="108"
/>

        </View>

      </View>
    </View>
  );
}
function TabBtn({ label, active, onPress }: any) {
  return (
    <TouchableOpacity
  style={styles.helpBtn}
  onPress={() =>
    alert("Emergency services notified 🚑")
  }
>
  <Text style={styles.helpText}>
    Help is on the way
  </Text>
</TouchableOpacity>
  );
}
function StatusItem({ title, sub }: any) {
  return (
    <View style={styles.statusItem}>
      <Text style={styles.statusTitle}>{title}</Text>
      <Text style={styles.statusSub}>{sub}</Text>
    </View>
  );
}
function ContactBtn({ label, color, phone }: any) {
  const callNumber = () => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <TouchableOpacity
      style={[styles.contactBtn, { backgroundColor: color }]}
      onPress={callNumber}
    >
      <Text style={styles.contactText}>{label}</Text>
    </TouchableOpacity>
  );
}

function ImmediateActions() {
  const steps = [
    "Sit down immediately in a comfortable position",
    "Loosen tight clothing around neck and chest",
    "If you have aspirin, chew one 325mg tablet",
    "Stay calm and breathe slowly",
    "Keep phone nearby for updates",
  ];

  return (
    <View style={styles.cardGreen}>
      <Text style={styles.cardTitle}>
        Immediate Actions - Do These NOW
      </Text>

      {steps.map((step, i) => (
        <StepItem key={i} num={i + 1} text={step} />
      ))}
    </View>
  );
}
function WhatNotToDo() {
  const steps = [
    "Do NOT ignore chest pain",
    "Do NOT drive yourself to hospital",
    "Do NOT take unknown medicines",
    "Do NOT panic or exert yourself",
    "Do NOT delay calling emergency services",
  ];

  return (
    <View style={styles.cardRed}>
      <Text style={styles.cardTitle}>
        What NOT To Do
      </Text>

      {steps.map((step, i) => (
        <StepItem key={i} num={i + 1} text={step} />
      ))}
    </View>
  );
}
function WaitForHelp() {
  const steps = [
    "Remain seated in the same position",
    "Focus on slow, deep breathing",
    "Stay on the line with emergency services",
    "Have someone stay with you",
    "Note the time symptoms started",
  ];

  return (
    <View style={styles.cardOrange}>
      <Text style={styles.cardTitle}>
        While Waiting for Medical Help
      </Text>

      {steps.map((step, i) => (
        <StepItem key={i} num={i + 1} text={step} />
      ))}
    </View>
  );
}
function StepItem({ num, text }: any) {
  return (
    <View style={styles.stepRow}>
      <View style={styles.stepCircle}>
        <Text style={{ color: "#FFF" }}>{num}</Text>
      </View>
      <Text>{text}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DC2626",
    padding: 20,
  },

  tabRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  tabBtn: {
    backgroundColor: "#E5E7EB",
    padding: 14,
    borderRadius: 10,
    marginRight: 10,
  },

  activeTab: {
    backgroundColor: "#DC2626",
  },

  mainRow: {
    flexDirection: "row",
    gap: 20,
  },

  rightPanel: {
    width: 280,
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
  },

  panelTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "#DC2626",
  },

  statusItem: {
    marginBottom: 12,
  },

  statusTitle: {
    fontWeight: "600",
  },

  statusSub: {
    color: "#6B7280",
  },

  helpBtn: {
    backgroundColor: "#10B981",
    padding: 14,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 14,
  },

  helpText: {
    color: "#FFF",
    fontWeight: "bold",
  },

  contactBtn: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },

  contactText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "600",
  },

  /* CARDS */

  cardGreen: {
    backgroundColor: "#10B981",
    padding: 16,
    borderRadius: 12,
  },

  cardRed: {
    backgroundColor: "#EF4444",
    padding: 16,
    borderRadius: 12,
  },

  cardOrange: {
    backgroundColor: "#F59E0B",
    padding: 16,
    borderRadius: 12,
  },

  cardTitle: {
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 12,
    fontSize: 16,
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});

