import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SymptomCheckbox from "./components/SymptomCheckbox";
import { calculateRisk } from "../../utils/riskEngine";
import { getSession } from "../../utils/storage";

export default function CheckIn() {
  const router = useRouter();

  // Risk result
  const [riskResult, setRiskResult] = useState<{
    level: "Low" | "Medium" | "High";
    reason: string;
  } | null>(null);

  // Vitals
  const [sys, setSys] = useState("");
  const [dia, setDia] = useState("");
  const [hr, setHr] = useState("");
  const [sugar, setSugar] = useState("");
  const [oxygen, setOxygen] = useState("");

  // Other data
  const [missedMeds, setMissedMeds] = useState(false);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleSymptom = (symptom: string) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleCalculateRisk = async () => {
    if (!sys || !dia || !hr || !sugar || !oxygen) {
      Alert.alert("Missing data", "Please fill all vital signs");
      return;
    }

    setLoading(true);

    try {
      const input = {
        sys: Number(sys),
        dia: Number(dia),
        hr: Number(hr),
        sugar: Number(sugar),
        spo2: Number(oxygen),
        symptomsCount: symptoms.length,
        missedMeds,
      };

      const risk = calculateRisk(input);

      const checkInRecord = {
        timestamp: new Date().toISOString(),
        vitals: input,
        symptoms,
        missedMeds,
        riskLevel: risk.level,
      };

      const session = await getSession();

      if (!session) {
        throw new Error("No active session");
      }

      const phone = session.phone;

      await AsyncStorage.setItem(
        `LAST_CHECKIN_${phone}`,
        JSON.stringify(checkInRecord)
      );

      // Save history
    const historyKey = `CHECKIN_HISTORY_${phone}`;

    const historyData = await AsyncStorage.getItem(historyKey);
    const history = historyData ? JSON.parse(historyData) : [];

    history.unshift(checkInRecord);

    await AsyncStorage.setItem(
      historyKey,
      JSON.stringify(history.slice(0, 30))
    );

      setRiskResult(risk);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Daily Health Check-In</Text>
      <Text style={styles.subtitle}>
        Answer these questions to assess your current health risk
      </Text>

      <Text style={styles.section}>Vital Signs</Text>

      <View style={styles.vitalsRow}>
        <View style={styles.bpContainer}>
          <TextInput
            style={styles.bpInput}
            placeholder="SYS"
            keyboardType="numeric"
            value={sys}
            onChangeText={setSys}
          />
          <TextInput
            style={styles.bpInput}
            placeholder="DIA"
            keyboardType="numeric"
            value={dia}
            onChangeText={setDia}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Heart Rate"
          keyboardType="numeric"
          value={hr}
          onChangeText={setHr}
        />

        <TextInput
          style={styles.input}
          placeholder="Sugar"
          keyboardType="numeric"
          value={sugar}
          onChangeText={setSugar}
        />
      </View>

      <View style={styles.oxygenContainer}>
        <TextInput
          style={[styles.input, styles.oxygenInput]}
          placeholder="Oxygen Level"
          keyboardType="numeric"
          value={oxygen}
          onChangeText={setOxygen}
        />
      </View>

      <Text style={styles.section}>Medicine Adherence</Text>
      <SymptomCheckbox
        label="I missed taking my prescribed medicines today"
        selected={missedMeds}
        onPress={() => setMissedMeds(!missedMeds)}
      />

      <Text style={styles.section}>Symptoms</Text>
      <View style={styles.symptomGrid}>
        {[
          "Dizziness",
          "Shortness of Breath",
          "Nausea",
          "Severe Headache",
          "Chest Pain",
          "Unusual Fatigue",
          "Confusion",
          "Numbness",
        ].map((symptom) => (
          <SymptomCheckbox
            key={symptom}
            label={symptom}
            selected={symptoms.includes(symptom)}
            onPress={() => toggleSymptom(symptom)}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleCalculateRisk}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Calculate Risk Level</Text>
        )}
      </TouchableOpacity>

      {riskResult && (
        <View
          style={[
            styles.riskCard,
            riskResult.level === "High" && styles.high,
            riskResult.level === "Medium" && styles.medium,
            riskResult.level === "Low" && styles.low,
          ]}
        >
          <Text style={styles.riskLevel}>{riskResult.level} Risk</Text>
          <Text style={styles.riskReason}>{riskResult.reason}</Text>

          <TouchableOpacity
            style={styles.viewDashboardBtn}
            onPress={() => router.replace("/patient")}
          >
            <Text style={styles.viewDashboardText}>View Dashboard</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
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

  section: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 12,
  },

  vitalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  bpContainer: {
    flexDirection: "row",
    gap: 6,
    width: "32%",
  },

  bpInput: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 10,
    width: "48%",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  input: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 10,
    width: "32%",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  oxygenContainer: {
    marginBottom: 20,
  },

  oxygenInput: {
    width: "100%",
  },

  symptomGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 24,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  riskCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 40,
  },

  high: {
    backgroundColor: "#FEE2E2",
  },

  medium: {
    backgroundColor: "#FEF3C7",
  },

  low: {
    backgroundColor: "#D1FAE5",
  },

  riskLevel: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },

  riskReason: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 12,
  },

  viewDashboardBtn: {
    alignSelf: "flex-start",
  },

  viewDashboardText: {
    color: "#2563EB",
    fontWeight: "600",
  },
});
