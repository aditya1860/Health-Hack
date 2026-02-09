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
import { calculateRisk as calculateRiskLevel } from "../../utils/riskEngine";

export default function CheckIn() {
  const router = useRouter();
  
  const [bp, setBp] = useState("");
  const [hr, setHr] = useState("");
  const [sugar, setSugar] = useState("");
  const [oxygen, setOxygen] = useState("");
  const [missedMeds, setMissedMeds] = useState(false);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [riskResult, setRiskResult] = useState<any>(null);

  const toggleSymptom = (symptom: string) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter((s) => s !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const getRiskColor = (level: string) => {
    if (level === "High") return "#EF4444";
    if (level === "Medium") return "#F59E0B";
    return "#10B981";
  };

  const calculateRisk = async () => {
    try {
      // Validate inputs
      if (!bp || !hr || !sugar || !oxygen) {
        Alert.alert(
          "Missing Information",
          "Please fill in all vital signs (Blood Pressure, Heart Rate, Blood Sugar, and Oxygen Level)"
        );
        return;
      }

      // Validate BP format
      if (!bp.includes("/")) {
        Alert.alert(
          "Invalid Blood Pressure",
          "Please enter blood pressure in format: 120/80"
        );
        return;
      }

      // Validate numeric inputs
      const hrNum = Number(hr);
      const sugarNum = Number(sugar);
      const oxygenNum = Number(oxygen);

      if (isNaN(hrNum) || isNaN(sugarNum) || isNaN(oxygenNum)) {
        Alert.alert(
          "Invalid Input",
          "Heart rate, sugar, and oxygen must be valid numbers"
        );
        return;
      }

      setLoading(true);
      console.log("Starting risk calculation...");

      // Prepare data for risk engine
      const checkInData = {
        sugar,
        heartRate: hr,
        bloodPressure: bp,
        oxygen,
        feeling: symptoms.join(", "), // Convert symptoms array to string
      };

      console.log("Check-in data:", checkInData);

      // Calculate risk using the risk engine
      const result = calculateRiskLevel(checkInData);
      console.log("Risk result:", result);

      // Add severity to symptoms if medicine was missed
      let fullExplanation = result.explanation;
      if (missedMeds) {
        fullExplanation += " Missed medication may affect overall health.";
      }

      // Prepare full check-in record
      const checkInRecord = {
        timestamp: new Date().toISOString(),
        sugar,
        heartRate: hr,
        bloodPressure: bp,
        oxygen,
        symptoms,
        missedMeds,
        riskLevel: `${result.level} Risk`,
        riskScore: result.score,
        explanation: fullExplanation,
      };

      console.log("Saving check-in record:", checkInRecord);

      // Save as latest check-in
      await AsyncStorage.setItem("LAST_CHECKIN", JSON.stringify(checkInRecord));
      console.log("Saved LAST_CHECKIN");

      // Update medicine streak
      if (!missedMeds) {
        const streakData = await AsyncStorage.getItem("MEDICINE_STREAK");
        const currentStreak = streakData ? parseInt(streakData) : 0;
        const newStreak = currentStreak + 1;
        await AsyncStorage.setItem("MEDICINE_STREAK", String(newStreak));
        console.log("Updated medicine streak to:", newStreak);
      } else {
        // Reset streak if medicine was missed
        await AsyncStorage.setItem("MEDICINE_STREAK", "0");
        console.log("Reset medicine streak to 0");
      }

      // Save to check-in history
      const historyKey = "CHECKIN_HISTORY";
      const historyData = await AsyncStorage.getItem(historyKey);
      const history = historyData ? JSON.parse(historyData) : [];
      history.unshift(checkInRecord); // Add to beginning
      
      // Keep only last 30 check-ins
      const trimmedHistory = history.slice(0, 30);
      await AsyncStorage.setItem(historyKey, JSON.stringify(trimmedHistory));
      console.log("Saved to history. Total records:", trimmedHistory.length);

      setLoading(false);
      setRiskResult({
        level: result.level,
        explanation: fullExplanation,
      });
      setShowResult(true);

      console.log("Check-in completed successfully!");
    } catch (error) {
      setLoading(false);
      console.error("Error calculating risk:", error);
      Alert.alert(
        "Error", 
        `Failed to save check-in: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`
      );
    }
  };

  const goToDashboard = () => {
    router.replace("/patient");
  };

  const resetForm = () => {
    setBp("");
    setHr("");
    setSugar("");
    setOxygen("");
    setMissedMeds(false);
    setSymptoms([]);
    setShowResult(false);
    setRiskResult(null);
  };

  if (showResult && riskResult) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.resultContainer}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>Risk Assessment Complete</Text>
            <View 
              style={[
                styles.riskBadge, 
                { backgroundColor: getRiskColor(riskResult.level) }
              ]}
            >
              <Text style={styles.riskBadgeText}>{riskResult.level} Risk</Text>
            </View>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Assessment</Text>
            <Text style={styles.resultText}>{riskResult.explanation}</Text>
          </View>

          <View style={styles.vitalsCard}>
            <Text style={styles.vitalsTitle}>Your Readings</Text>
            <View style={styles.vitalsGrid}>
              <View style={styles.vitalItem}>
                <Text style={styles.vitalLabel}>Blood Pressure</Text>
                <Text style={styles.vitalValue}>{bp}</Text>
              </View>
              <View style={styles.vitalItem}>
                <Text style={styles.vitalLabel}>Heart Rate</Text>
                <Text style={styles.vitalValue}>{hr} bpm</Text>
              </View>
              <View style={styles.vitalItem}>
                <Text style={styles.vitalLabel}>Blood Sugar</Text>
                <Text style={styles.vitalValue}>{sugar} mg/dL</Text>
              </View>
              <View style={styles.vitalItem}>
                <Text style={styles.vitalLabel}>Oxygen</Text>
                <Text style={styles.vitalValue}>{oxygen}%</Text>
              </View>
            </View>
          </View>

          {symptoms.length > 0 && (
            <View style={styles.symptomsCard}>
              <Text style={styles.symptomsTitle}>Reported Symptoms</Text>
              <View style={styles.symptomsList}>
                {symptoms.map((symptom, index) => (
                  <View key={index} style={styles.symptomTag}>
                    <Text style={styles.symptomTagText}>{symptom}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {missedMeds && (
            <View style={styles.warningCard}>
              <Text style={styles.warningText}>⚠️ Medication was missed today</Text>
            </View>
          )}

          <TouchableOpacity style={styles.primaryButton} onPress={goToDashboard}>
            <Text style={styles.primaryButtonText}>View Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={resetForm}>
            <Text style={styles.secondaryButtonText}>New Check-In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* TITLE */}
      <Text style={styles.title}>Daily Health Check-In</Text>

      <Text style={styles.subtitle}>
        Answer these questions to assess your current health risk level
      </Text>

      {/* VITAL SIGNS */}
      <Text style={styles.section}>Vital Signs</Text>

      <View style={styles.vitalsRow}>
        <TextInput
          style={styles.input}
          placeholder="BP e.g. 120/80"
          value={bp}
          onChangeText={setBp}
          keyboardType="default"
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Heart Rate"
          value={hr}
          onChangeText={setHr}
          keyboardType="numeric"
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Sugar"
          value={sugar}
          onChangeText={setSugar}
          keyboardType="numeric"
          editable={!loading}
        />
      </View>

      {/* OXYGEN LEVEL */}
      <View style={styles.oxygenContainer}>
        <TextInput
          style={[styles.input, styles.oxygenInput]}
          placeholder="Oxygen Level (e.g. 95)"
          value={oxygen}
          onChangeText={setOxygen}
          keyboardType="numeric"
          editable={!loading}
        />
      </View>

      {/* MEDICINE */}
      <Text style={styles.section}>Medicine Adherence</Text>

      <SymptomCheckbox
        label="I missed taking my prescribed medicines today"
        selected={missedMeds}
        onPress={() => !loading && setMissedMeds(!missedMeds)}
      />

      {/* SYMPTOMS */}
      <Text style={styles.section}>Symptoms (Select all that apply)</Text>

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
            onPress={() => !loading && toggleSymptom(symptom)}
          />
        ))}
      </View>

      {/* BUTTON */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={calculateRisk}
        disabled={loading}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#FFFFFF" />
            <Text style={styles.loadingText}>Analyzing...</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>Calculate Risk Level</Text>
        )}
      </TouchableOpacity>
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
    color: "#111827",
  },

  subtitle: {
    color: "#6B7280",
    marginBottom: 20,
    fontSize: 14,
  },

  section: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 10,
    color: "#111827",
  },

  vitalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  oxygenContainer: {
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 10,
    width: "32%",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 14,
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
    marginBottom: 40,
    elevation: 3,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
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

  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  loadingText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  // Result Screen Styles
  resultContainer: {
    padding: 20,
  },

  resultHeader: {
    alignItems: "center",
    marginBottom: 24,
  },

  resultTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },

  riskBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  riskBadgeText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  resultCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#2563EB",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  resultLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 8,
    textTransform: "uppercase",
  },

  resultText: {
    fontSize: 15,
    color: "#111827",
    lineHeight: 22,
  },

  vitalsCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  vitalsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },

  vitalsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  vitalItem: {
    flex: 1,
    minWidth: "47%",
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#2563EB",
  },

  vitalLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },

  vitalValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  symptomsCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  symptomsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },

  symptomsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  symptomTag: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },

  symptomTagText: {
    color: "#92400E",
    fontSize: 13,
    fontWeight: "500",
  },

  warningCard: {
    backgroundColor: "#FEF2F2",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
    marginBottom: 16,
  },

  warningText: {
    color: "#991B1B",
    fontSize: 14,
    fontWeight: "600",
  },

  primaryButton: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  secondaryButton: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 40,
    borderWidth: 2,
    borderColor: "#2563EB",
  },

  secondaryButtonText: {
    color: "#2563EB",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});