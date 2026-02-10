import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SymptomCheckbox from "./components/SymptomCheckbox";
import { calculateRisk } from "../../utils/riskEngine";
import { getSession } from "../../utils/storage";

export default function CheckIn() {
  const router = useRouter();
  const navigation = useNavigation();

  /* ---------------- STATES ---------------- */

  const [riskResult, setRiskResult] = useState<{
    level: "Low" | "Medium" | "High";
    reason: string;
  } | null>(null);

  const [sys, setSys] = useState("");
  const [dia, setDia] = useState("");
  const [hr, setHr] = useState("");
  const [sugar, setSugar] = useState("");
  const [oxygen, setOxygen] = useState("");

  const [missedMeds, setMissedMeds] =
    useState(false);
  const [symptoms, setSymptoms] = useState<
    string[]
  >([]);
  const [loading, setLoading] = useState(false);

  const [lastCheckIn, setLastCheckIn] =
    useState<string | null>(null);

  /* ---------------- NAVBAR LOGO ---------------- */

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Image
          source={require("../../assets/images/carefast-logo.png")}
          style={{
            width: 36,
            height: 36,
            marginRight: 10,
            resizeMode: "contain",
          }}
        />
      ),
    });
  }, []);

  /* ---------------- LOAD LAST CHECKIN ---------------- */

  useEffect(() => {
    loadLastCheckIn();
  }, []);

  const loadLastCheckIn = async () => {
    const session = await getSession();
    if (!session) return;

    const data = await AsyncStorage.getItem(
      `LAST_CHECKIN_${session.phone}`
    );

    if (data) {
      const parsed = JSON.parse(data);
      setLastCheckIn(parsed.timestamp);
    }
  };

  /* ---------------- SYMPTOMS ---------------- */

  const toggleSymptom = (symptom: string) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  /* ---------------- VALIDATION ---------------- */

  const validateVitals = () => {
    const s = Number(sys);
    const d = Number(dia);
    const h = Number(hr);
    const su = Number(sugar);
    const o = Number(oxygen);

    if (s < 70 || s > 250) {
      Alert.alert(
        "Invalid SYS",
        "Enter valid systolic BP (70–250)"
      );
      return false;
    }

    if (d < 40 || d > 150) {
      Alert.alert(
        "Invalid DIA",
        "Enter valid diastolic BP (40–150)"
      );
      return false;
    }

    if (h < 30 || h > 200) {
      Alert.alert(
        "Invalid Heart Rate",
        "Enter valid HR (30–200)"
      );
      return false;
    }

    if (su < 40 || su > 500) {
      Alert.alert(
        "Invalid Sugar",
        "Enter valid sugar level"
      );
      return false;
    }

    if (o < 50 || o > 100) {
      Alert.alert(
        "Invalid Oxygen",
        "Enter valid SpO₂ (50–100)"
      );
      return false;
    }

    return true;
  };

  /* ---------------- CALCULATE RISK ---------------- */

  const handleCalculateRisk = async () => {
    if (!sys || !dia || !hr || !sugar || !oxygen) {
      Alert.alert(
        "Missing data",
        "Please fill all vital signs"
      );
      return;
    }

    if (!validateVitals()) return;

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
      if (!session) throw new Error("No session");

      const phone = session.phone;

      /* ---- LAST CHECKIN ---- */
      await AsyncStorage.setItem(
        `LAST_CHECKIN_${phone}`,
        JSON.stringify(checkInRecord)
      );

      /* ---- HISTORY ---- */
      const historyKey = `CHECKIN_HISTORY_${phone}`;
      const historyData =
        await AsyncStorage.getItem(historyKey);
      const history = historyData
        ? JSON.parse(historyData)
        : [];

      history.unshift(checkInRecord);

      await AsyncStorage.setItem(
        historyKey,
        JSON.stringify(history.slice(0, 30))
      );

      setRiskResult(risk);
      setLastCheckIn(checkInRecord.timestamp);
    } catch (err) {
      console.error(err);
      Alert.alert(
        "Error",
        "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Daily Health Check-In
      </Text>

      <Text style={styles.subtitle}>
        Answer these questions to assess your
        current health risk
      </Text>

      {lastCheckIn && (
        <Text style={styles.lastCheckIn}>
          Last Check-In:{" "}
          {new Date(
            lastCheckIn
          ).toLocaleString()}
        </Text>
      )}

      {/* BP SECTION */}
      <Text style={styles.section}>
        Blood Pressure (BP)
      </Text>

      <View style={styles.bpWrapper}>
        <View style={styles.bpBox}>
          <Text style={styles.bpLabel}>SYS</Text>
          <TextInput
            style={styles.bpInput}
            placeholder="120"
            keyboardType="numeric"
            value={sys}
            onChangeText={setSys}
          />
        </View>

        <Text style={styles.bpSlash}>/</Text>

        <View style={styles.bpBox}>
          <Text style={styles.bpLabel}>DIA</Text>
          <TextInput
            style={styles.bpInput}
            placeholder="80"
            keyboardType="numeric"
            value={dia}
            onChangeText={setDia}
          />
        </View>
      </View>

      {/* OTHER VITALS */}
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

      <TextInput
        style={styles.input}
        placeholder="Oxygen Level"
        keyboardType="numeric"
        value={oxygen}
        onChangeText={setOxygen}
      />

      {/* MED ADHERENCE */}
      <Text style={styles.section}>
        Medicine Adherence
      </Text>

      <SymptomCheckbox
        label="I missed taking my prescribed medicines today"
        selected={missedMeds}
        onPress={() =>
          setMissedMeds(!missedMeds)
        }
      />

      {/* SYMPTOMS */}
      <Text style={styles.section}>
        Symptoms
      </Text>

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
            selected={symptoms.includes(
              symptom
            )}
            onPress={() =>
              toggleSymptom(symptom)
            }
          />
        ))}
      </View>

      {/* BUTTON */}
      <TouchableOpacity
        style={[
          styles.button,
          loading &&
            styles.buttonDisabled,
        ]}
        onPress={handleCalculateRisk}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>
            Calculate Risk Level
          </Text>
        )}
      </TouchableOpacity>

      {/* RESULT */}
      {riskResult && (
        <View
          style={[
            styles.riskCard,
            riskResult.level === "High" &&
              styles.high,
            riskResult.level ===
              "Medium" && styles.medium,
            riskResult.level === "Low" &&
              styles.low,
          ]}
        >
          <Text style={styles.riskLevel}>
            {riskResult.level} Risk
          </Text>

          <Text style={styles.riskReason}>
            {riskResult.reason}
          </Text>

          <TouchableOpacity
            onPress={() =>
              router.replace("/patient")
            }
          >
            <Text
              style={
                styles.viewDashboardText
              }
            >
              View Dashboard
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#6B7280",
    marginBottom: 6,
  },

  lastCheckIn: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 16,
  },

  section: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 10,
  },

  /* BP */
  bpWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  bpBox: {
    flex: 1,
  },

  bpLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },

  bpInput: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    textAlign: "center",
  },

  bpSlash: {
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 10,
  },

  input: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
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
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },

  riskCard: {
    padding: 16,
    borderRadius: 12,
  },

  high: { backgroundColor: "#FEE2E2" },
  medium: { backgroundColor: "#FEF3C7" },
  low: { backgroundColor: "#D1FAE5" },

  riskLevel: {
    fontSize: 18,
    fontWeight: "700",
  },

  riskReason: {
    marginVertical: 8,
  },

  viewDashboardText: {
    color: "#2563EB",
    fontWeight: "600",
  },
});
