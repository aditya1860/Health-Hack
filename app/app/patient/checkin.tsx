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

// Type for check-in data
type CheckInData = {
  sugar: string;
  heartRate: string;
  bloodPressure: string;
  oxygen: string;
  feeling: string;
};

// Risk calculation function (embedded to ensure it works)
function calculateRiskLevel(data: CheckInData) {
  let score = 0;
  const reasons: string[] = [];

  const sugar = Number(data.sugar);
  const heartRate = Number(data.heartRate);
  const oxygen = Number(data.oxygen);

  // Blood Sugar Analysis
  if (!isNaN(sugar)) {
    if (sugar >= 180) {
      score += 3;
      reasons.push("Blood sugar is dangerously high (≥180 mg/dL)");
    } else if (sugar >= 140) {
      score += 2;
      reasons.push("Blood sugar is elevated (≥140 mg/dL)");
    } else if (sugar >= 100) {
      score += 1;
      reasons.push("Blood sugar is slightly high (≥100 mg/dL)");
    }
  }

  // Heart Rate Analysis
  if (!isNaN(heartRate)) {
    if (heartRate >= 120) {
      score += 3;
      reasons.push("Heart rate is very high (≥120 bpm)");
    } else if (heartRate >= 100) {
      score += 2;
      reasons.push("Heart rate is elevated (≥100 bpm)");
    } else if (heartRate <= 50) {
      score += 2;
      reasons.push("Heart rate is too low (≤50 bpm)");
    }
  }

  // Blood Pressure Analysis
  if (data.bloodPressure.includes("/")) {
    const [sys, dia] = data.bloodPressure.split("/").map(Number);
    if (!isNaN(sys) && !isNaN(dia)) {
      if (sys >= 180 || dia >= 120) {
        score += 4;
        reasons.push("Blood pressure is critically high");
      } else if (sys >= 140 || dia >= 90) {
        score += 2;
        reasons.push("Blood pressure is high (Stage 2 Hypertension)");
      } else if (sys >= 130 || dia >= 80) {
        score += 1;
        reasons.push("Blood pressure is slightly elevated");
      }
    }
  }

  // Oxygen Level Analysis
  if (!isNaN(oxygen)) {
    if (oxygen < 90) {
      score += 4;
      reasons.push("Oxygen level is critically low (<90%)");
    } else if (oxygen < 95) {
      score += 2;
      reasons.push("Oxygen level is below normal (<95%)");
    }
  }

  // Symptoms Analysis
  if (data.feeling && data.feeling.length > 10) {
    const symptomsCount = data.feeling.split(",").length;
    score += Math.min(symptomsCount, 3);
    reasons.push(`Experiencing ${symptomsCount} symptom(s)`);
  }

  // Determine risk level
  let level: "Low" | "Medium" | "High" = "Low";
  let percentage = 0;

  if (score >= 8) {
    level = "High";
    percentage = Math.min(75 + score * 3, 100);
  } else if (score >= 4) {
    level = "Medium";
    percentage = 40 + score * 5;
  } else {
    level = "Low";
    percentage = Math.max(10, score * 10);
  }

  return {
    level,
    score,
    percentage,
    explanation:
      reasons.length > 0
        ? reasons.join(". ") + "."
        : "All readings are within safe ranges. Keep up the good work!",
  };
}

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

  const notifyDoctor = async (checkInRecord: any) => {
    try {
      // Get patient info
      const sessionData = await AsyncStorage.getItem("CURRENT_USER");
      const session = sessionData ? JSON.parse(sessionData) : null;
      
      if (!session || !session.doctorPhone) {
        console.log("No doctor assigned to notify");
        return;
      }

      // Create notification for doctor
      const notification = {
        id: Date.now().toString(),
        patientName: session.name || "Unknown Patient",
        patientPhone: session.phone,
        timestamp: checkInRecord.timestamp,
        riskLevel: checkInRecord.riskLevel,
        vitals: {
          bloodPressure: checkInRecord.bloodPressure,
          heartRate: checkInRecord.heartRate,
          sugar: checkInRecord.sugar,
          oxygen: checkInRecord.oxygen,
        },
        symptoms: checkInRecord.symptoms,
        missedMeds: checkInRecord.missedMeds,
        explanation: checkInRecord.explanation,
        read: false,
      };

      // Save to doctor's notifications
      const notificationsKey = `DOCTOR_NOTIFICATIONS_${session.doctorPhone}`;
      const existingData = await AsyncStorage.getItem(notificationsKey);
      const notifications = existingData ? JSON.parse(existingData) : [];
      
      notifications.unshift(notification);
      
      // Keep only last 50 notifications
      const trimmed = notifications.slice(0, 50);
      await AsyncStorage.setItem(notificationsKey, JSON.stringify(trimmed));
      
      console.log("Doctor notified successfully");
    } catch (error) {
      console.error("Error notifying doctor:", error);
    }
  };

  const calculateRisk = async () => {
    try {
      console.log("Button clicked - starting risk calculation");

      // Validate inputs
      if (!bp || !hr || !sugar || !oxygen) {
        Alert.alert(
          "Missing Information",
          "Please fill in all vital signs:\n• Blood Pressure (e.g., 120/80)\n• Heart Rate (e.g., 72)\n• Blood Sugar (e.g., 100)\n• Oxygen Level (e.g., 95)"
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

      // Range validation
      if (hrNum < 30 || hrNum > 200) {
        Alert.alert("Invalid Heart Rate", "Heart rate should be between 30-200 bpm");
        return;
      }

      if (sugarNum < 40 || sugarNum > 500) {
        Alert.alert("Invalid Blood Sugar", "Blood sugar should be between 40-500 mg/dL");
        return;
      }

      if (oxygenNum < 70 || oxygenNum > 100) {
        Alert.alert("Invalid Oxygen Level", "Oxygen level should be between 70-100%");
        return;
      }

      setLoading(true);
      console.log("Validation passed, calculating risk...");

      // Prepare data for risk engine
      const checkInData: CheckInData = {
        sugar,
        heartRate: hr,
        bloodPressure: bp,
        oxygen,
        feeling: symptoms.join(", "),
      };

      console.log("Check-in data:", checkInData);

      // Calculate risk
      const result = calculateRiskLevel(checkInData);
      console.log("Risk calculation result:", result);

      // Add medication note
      let fullExplanation = result.explanation;
      if (missedMeds) {
        fullExplanation += " Note: Medication was missed today, which may impact health status.";
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
        riskPercentage: result.percentage,
        explanation: fullExplanation,
      };

      console.log("Saving check-in record...");

      // Save as latest check-in
      await AsyncStorage.setItem("LAST_CHECKIN", JSON.stringify(checkInRecord));
      console.log("✓ Saved LAST_CHECKIN");

      // Update medicine streak
      if (!missedMeds) {
        const streakData = await AsyncStorage.getItem("MEDICINE_STREAK");
        const currentStreak = streakData ? parseInt(streakData) : 0;
        const newStreak = currentStreak + 1;
        await AsyncStorage.setItem("MEDICINE_STREAK", String(newStreak));
        console.log(`✓ Updated medicine streak: ${newStreak}`);
      } else {
        await AsyncStorage.setItem("MEDICINE_STREAK", "0");
        console.log("✓ Reset medicine streak to 0");
      }

      // Save to check-in history
      const historyKey = "CHECKIN_HISTORY";
      const historyData = await AsyncStorage.getItem(historyKey);
      const history = historyData ? JSON.parse(historyData) : [];
      history.unshift(checkInRecord);
      
      const trimmedHistory = history.slice(0, 30);
      await AsyncStorage.setItem(historyKey, JSON.stringify(trimmedHistory));
      console.log(`✓ Saved to history (${trimmedHistory.length} records)`);

      // Notify doctor if risk is medium or high
      if (result.level === "Medium" || result.level === "High") {
        await notifyDoctor(checkInRecord);
        console.log("✓ Doctor notified");
      }

      setLoading(false);
      setRiskResult({
        level: result.level,
        percentage: result.percentage,
        explanation: fullExplanation,
      });
      setShowResult(true);

      console.log("✓ Check-in completed successfully!");
    } catch (error) {
      setLoading(false);
      console.error("❌ Error during risk calculation:", error);
      Alert.alert(
        "Error", 
        `Something went wrong: ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease try again.`
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

  // RESULT SCREEN
  if (showResult && riskResult) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.resultContainer}>
          {/* Success Icon */}
          <View style={styles.successIcon}>
            <Text style={styles.successIconText}>✓</Text>
          </View>

          <Text style={styles.resultTitle}>Check-In Complete</Text>
          
          {/* Risk Level Badge */}
          <View 
            style={[
              styles.riskBadge, 
              { backgroundColor: getRiskColor(riskResult.level) }
            ]}
          >
            <Text style={styles.riskBadgeText}>{riskResult.level} Risk</Text>
            <Text style={styles.riskPercentage}>{riskResult.percentage}%</Text>
          </View>

          {/* Assessment Card */}
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>HEALTH ASSESSMENT</Text>
            <Text style={styles.resultText}>{riskResult.explanation}</Text>
          </View>

          {/* Vitals Summary */}
          <View style={styles.vitalsCard}>
            <Text style={styles.vitalsTitle}>Your Vital Signs</Text>
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

          {/* Symptoms if any */}
          {symptoms.length > 0 && (
            <View style={styles.symptomsCard}>
              <Text style={styles.symptomsTitle}>Symptoms Reported</Text>
              <View style={styles.symptomsList}>
                {symptoms.map((symptom, index) => (
                  <View key={index} style={styles.symptomTag}>
                    <Text style={styles.symptomTagText}>• {symptom}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Medication Warning */}
          {missedMeds && (
            <View style={styles.warningCard}>
              <Text style={styles.warningIcon}>⚠️</Text>
              <Text style={styles.warningText}>
                You reported missing your medication today. Please take it as soon as possible.
              </Text>
            </View>
          )}

          {/* Doctor Notification Status */}
          {(riskResult.level === "Medium" || riskResult.level === "High") && (
            <View style={styles.infoCard}>
              <Text style={styles.infoIcon}>📋</Text>
              <Text style={styles.infoText}>
                Your doctor has been notified about this check-in due to {riskResult.level.toLowerCase()} risk level.
              </Text>
            </View>
          )}

          {/* Action Buttons */}
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

  // CHECK-IN FORM
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Daily Health Check-In</Text>
      <Text style={styles.subtitle}>
        Answer these questions to assess your current health risk level
      </Text>

      {/* Vital Signs */}
      <Text style={styles.section}>Vital Signs</Text>
      <View style={styles.vitalsRow}>
        <TextInput
          style={styles.input}
          placeholder="BP e.g. 120/80"
          value={bp}
          onChangeText={setBp}
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

      {/* Medicine Adherence */}
      <Text style={styles.section}>Medicine Adherence</Text>
      <SymptomCheckbox
        label="I missed taking my prescribed medicines today"
        selected={missedMeds}
        onPress={() => !loading && setMissedMeds(!missedMeds)}
      />

      {/* Symptoms */}
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

      {/* Calculate Button */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={calculateRisk}
        disabled={loading}
        activeOpacity={0.7}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#FFFFFF" />
            <Text style={styles.loadingText}>Analyzing your health data...</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#111827",
  },

  subtitle: {
    color: "#6B7280",
    marginBottom: 24,
    fontSize: 14,
    lineHeight: 20,
  },

  section: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 16,
    color: "#111827",
  },

  vitalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 12,
  },

  oxygenContainer: {
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 10,
    flex: 1,
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
    gap: 8,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 18,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 40,
    elevation: 4,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },

  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  loadingText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  // Result Screen Styles
  resultContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },

  successIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  successIconText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
  },

  resultTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
  },

  riskBadge: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
    marginBottom: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    alignItems: "center",
  },

  riskBadgeText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },

  riskPercentage: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  resultCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 14,
    marginBottom: 16,
    width: "100%",
    borderLeftWidth: 4,
    borderLeftColor: "#2563EB",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  resultLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6B7280",
    marginBottom: 8,
    letterSpacing: 1,
  },

  resultText: {
    fontSize: 15,
    color: "#111827",
    lineHeight: 24,
  },

  vitalsCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 14,
    marginBottom: 16,
    width: "100%",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  vitalsTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },

  vitalsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  vitalItem: {
    flex: 1,
    minWidth: "47%",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#2563EB",
  },

  vitalLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 6,
    fontWeight: "500",
  },

  vitalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  symptomsCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 14,
    marginBottom: 16,
    width: "100%",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  symptomsTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },

  symptomsList: {
    gap: 8,
  },

  symptomTag: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },

  symptomTagText: {
    color: "#92400E",
    fontSize: 14,
    fontWeight: "500",
  },

  warningCard: {
    backgroundColor: "#FEF2F2",
    padding: 18,
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
    marginBottom: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  warningIcon: {
    fontSize: 24,
  },

  warningText: {
    color: "#991B1B",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
    lineHeight: 20,
  },

  infoCard: {
    backgroundColor: "#EFF6FF",
    padding: 18,
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
    marginBottom: 24,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  infoIcon: {
    fontSize: 24,
  },

  infoText: {
    color: "#1E40AF",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
    lineHeight: 20,
  },

  primaryButton: {
    backgroundColor: "#2563EB",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    width: "100%",
    elevation: 4,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },

  secondaryButton: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 12,
    marginBottom: 40,
    width: "100%",
    borderWidth: 2,
    borderColor: "#2563EB",
  },

  secondaryButtonText: {
    color: "#2563EB",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});