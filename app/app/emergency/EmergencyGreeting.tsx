import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, SafeAreaView, StatusBar } from "react-native";
import { EmergencyKey } from "./emergencyGuide";
import CommonBackButton from "../../components/CommonBackButton";

const EMERGENCY_TYPES: { key: EmergencyKey; label: string; color: string }[] = [
  { key: "heart", label: "Heart Attack", color: "#EF4444" },
  { key: "fall", label: "Fall / Injury", color: "#F97316" },
  { key: "blood", label: "Bleeding", color: "#D946EF" },
  { key: "breathing", label: "Can't Breathe", color: "#3B82F6" },
  { key: "burn", label: "Burn", color: "#F59E0B" },
];

const EMERGENCY_PROTOCOLS = {
  heart: {
    title: "Heart Attack Protocol",
    immediateActions: ["Sit down in a comfortable position", "Loosen tight clothing around neck/chest", "Chew one 325mg aspirin (if not allergic)", "Stay calm and breathe slowly"],
    whatNotToDo: ["Don't ignore symptoms", "Don't eat/drink anything else", "Don't drive yourself", "Don't lie completely flat"],
    waitForHelp: ["Stay seated", "Unlock your front door", "Note time symptoms started"],
  },
  fall: {
    title: "Injury Protocol",
    immediateActions: ["Stay still and assess pain", "Apply pressure to bleeding", "Keep injured area still", "Breathe slowly"],
    whatNotToDo: ["Don't move if neck/back pain exists", "Don't remove embedded objects", "Don't try to stand if dizzy"],
    waitForHelp: ["Keep warm with a blanket", "Continue pressure on wounds", "Stay alert and talking"],
  },
  blood: {
    title: "Bleeding Protocol",
    immediateActions: ["Apply firm, direct pressure", "Sit or lie down", "Elevate wound above heart", "Add more cloth if soaked"],
    whatNotToDo: ["Don't remove embedded objects", "Don't peek at the wound", "Don't use a tourniquet unless trained"],
    waitForHelp: ["Maintain constant pressure", "Keep area elevated", "Stay lying down"],
  },
  breathing: {
    title: "Breathing Protocol",
    immediateActions: ["Sit upright", "Loosen tight clothing", "Use prescribed inhaler", "Slow nasal breathing"],
    whatNotToDo: ["Don't lie down flat", "Don't breathe into a paper bag", "Don't force deep gasps"],
    waitForHelp: ["Stay upright", "Focus on controlled exhales", "Keep inhaler nearby"],
  },
  burn: {
    title: "Burn Protocol",
    immediateActions: ["Remove from heat source", "Cool with running water (10-20m)", "Remove jewelry from area", "Cover loosely with clean cloth"],
    whatNotToDo: ["Don't use ice or ice-water", "Don't apply butter or oils", "Don't break blisters"],
    waitForHelp: ["Keep the person warm", "Elevate burned limb", "Monitor for shock"],
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
    let interval: ReturnType<typeof setInterval>;
    if (selectedEmergency) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [selectedEmergency]);

  const handleSelectType = (type: EmergencyKey) => {
    setSelectedEmergency(type);
    onSelectType?.(type);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTabContent = () => {
    if (!selectedEmergency) return [];
    const protocol = EMERGENCY_PROTOCOLS[selectedEmergency];
    if (activeTab === "immediate") return protocol.immediateActions;
    if (activeTab === "not") return protocol.whatNotToDo;
    return protocol.waitForHelp;
  };

  if (!selectedEmergency) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <Text style={styles.headerLabel}>EMERGENCY ASSIST</Text>
          <Text style={styles.title}>What is the nature of the emergency?</Text>
        </View>

        {/* Back Button – top left */}
<View style={styles.backButton}>
  <CommonBackButton color="#111827" />
</View>



        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {EMERGENCY_TYPES.map((type) => (
            <Pressable
              key={type.key}
              style={({ pressed }) => [styles.selectionCard, pressed && styles.buttonPressed]}
              onPress={() => handleSelectType(type.key)}
            >
              <View style={[styles.colorIndicator, { backgroundColor: type.color }]} />
              <Text style={styles.selectionText}>{type.label}</Text>
              <Text style={styles.chevron}>→</Text>
            </Pressable>
          ))}
        </ScrollView>


        
        <View style={styles.minimalFooter}>
          <Text style={styles.footerText}>Help will be dispatched to your current location immediately.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const protocol = EMERGENCY_PROTOCOLS[selectedEmergency];

  return (
    <SafeAreaView style={styles.protocolContainer}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.proHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.proHeaderStatus}>LIVE EMERGENCY SESSION</Text>
          <Text style={styles.proHeaderTitle} numberOfLines={1}>{protocol.title}</Text>
        </View>
        <View style={styles.proTimerBadge}>
          <Text style={styles.proTimerText}>{formatTime(timeElapsed)}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.segmentedControl}>
          {(["immediate", "not", "wait"] as const).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.segment, activeTab === tab && styles.segmentActive]}
            >
              <Text style={[styles.segmentText, activeTab === tab && styles.segmentTextActive]}>
                {tab === "immediate" ? "Action" : tab === "not" ? "Avoid" : "Wait"}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.instructionCard}>
          <Text style={styles.cardLabel}>{activeTab === 'not' ? 'CRITICAL AVOIDANCE' : 'INSTRUCTIONS'}</Text>
          {getTabContent().map((action, index) => (
            <View key={index} style={styles.proActionItem}>
              <Text style={[styles.proActionBullet, activeTab === 'not' && { color: '#EF4444' }]}>
                {activeTab === 'not' ? '✕' : '•'}
              </Text>
              <Text style={styles.proActionText}>{action}</Text>
            </View>
          ))}
        </View>

        <View style={styles.whiteCard}>
          <Text style={styles.cardLabel}>SYSTEM STATUS</Text>
          <View style={styles.statusRow}>
            <View style={styles.greenDot} />
            <Text style={styles.statusMainText}>Location Shared • Contacts Notified</Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <Pressable style={[styles.callButton, { backgroundColor: "#F1F5F9" }]}>
            <Text style={[styles.callButtonText, { color: "#475569" }]}>Family</Text>
          </Pressable>
          <Pressable style={[styles.callButton, { backgroundColor: "#10B981" }]}>
            <Text style={styles.callButtonText}>Doctor</Text>
          </Pressable>
          <Pressable style={[styles.callButton, { backgroundColor: "#DC2626", flex: 2 }]}>
            <Text style={styles.callButtonText}>Call 108</Text>
          </Pressable>
        </View>
        
        <Pressable onPress={() => setSelectedEmergency(null)} style={styles.cancelLink}>
          <Text style={styles.cancelLinkText}>End Session</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
header: {
  paddingTop: 72,   // pushed down to clear back button
  paddingHorizontal: 24,
  paddingBottom: 20,
},

  headerLabel: { fontSize: 12, fontWeight: "800", color: "#94A3B8", letterSpacing: 1.5, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: "700", color: "#0F172A", lineHeight: 34 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 24, gap: 12 },
  selectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  colorIndicator: { width: 4, height: 28, borderRadius: 2, marginRight: 16 },
  selectionText: { fontSize: 18, fontWeight: "600", color: "#1E293B", flex: 1 },
  chevron: { color: "#CBD5E1", fontSize: 18, fontWeight: "600" },
  buttonPressed: { opacity: 0.8, backgroundColor: "#F8FAFC", transform: [{ scale: 0.99 }] },
  minimalFooter: { padding: 24, alignItems: "center" },
  footerText: { color: "#94A3B8", fontSize: 14, textAlign: "center", lineHeight: 20 },

  // Protocol Screen
  protocolContainer: { flex: 1, backgroundColor: "#F8FAFC" },
  proHeader: { 
    paddingTop: 20, paddingHorizontal: 24, paddingBottom: 20, 
    backgroundColor: "#FFFFFF", borderBottomWidth: 1, borderColor: "#F1F5F9",
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  proHeaderStatus: { fontSize: 10, fontWeight: "800", color: "#EF4444", letterSpacing: 1 },
  proHeaderTitle: { fontSize: 20, fontWeight: "700", color: "#0F172A", marginTop: 2 },
  proTimerBadge: { backgroundColor: "#FEE2E2", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  proTimerText: { fontSize: 16, fontWeight: "700", color: "#EF4444", fontVariant: ['tabular-nums'] },
  
  content: { flex: 1, padding: 24 },
  segmentedControl: { 
    flexDirection: 'row', backgroundColor: '#F1F5F9', padding: 4, borderRadius: 12, marginBottom: 24 
  },
  segment: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  segmentActive: { backgroundColor: '#FFFFFF', shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  segmentText: { fontSize: 14, fontWeight: '600', color: '#64748B' },
  segmentTextActive: { color: '#0F172A' },

  instructionCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: '#F1F5F9' },
  cardLabel: { fontSize: 11, fontWeight: '800', color: '#94A3B8', marginBottom: 16, letterSpacing: 1 },
  proActionItem: { flexDirection: 'row', marginBottom: 16, alignItems: 'flex-start' },
  proActionBullet: { fontSize: 18, color: '#10B981', marginRight: 12, fontWeight: 'bold' },
  proActionText: { fontSize: 16, color: '#334155', flex: 1, lineHeight: 24, fontWeight: '500' },

  whiteCard: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#F1F5F9', marginBottom: 16 },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  greenDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10B981', marginRight: 10 },
  statusMainText: { color: '#64748B', fontWeight: '600', fontSize: 13 },

  buttonRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  callButton: { flex: 1, paddingVertical: 16, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  callButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  cancelLink: { alignSelf: 'center', marginTop: 24, padding: 10 },
  cancelLinkText: { color: '#94A3B8', fontWeight: '600', fontSize: 14, textDecorationLine: 'underline' },

  backButton: {
  position: "absolute",
  top: 12,
  left: 12,
  zIndex: 10,
}



});