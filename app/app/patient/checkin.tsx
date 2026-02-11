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
  Vibration,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NumberStepperInput from "../../components/NumberStepperInput";
import SymptomCheckbox from "../../components/patient-page/SymptomCheckbox";
import { calculateRisk } from "../../utils/riskEngine";
import { getSession } from "../../utils/storage";
import Slider from "@react-native-community/slider";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";



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
  const [hr, setHr] = useState(72);
  const [sugar, setSugar] = useState(100);
  const [oxygen, setOxygen] = useState(98);
  const [monitoredVitals, setMonitoredVitals] = useState<string[]>([]);


  const [missedMeds, setMissedMeds] =
    useState(false);
  const [symptoms, setSymptoms] = useState<
    string[]
  >([]);
  const [loading, setLoading] = useState(false);

  const [lastCheckIn, setLastCheckIn] =
    useState<string | null>(null);

const headerHeight = useHeaderHeight();
const { top } = useSafeAreaInsets();


  /* ---------------- NAVBAR LOGO ---------------- */

useEffect(() => {
  const loadVitals = async () => {
    const session = await getSession();
    if (session?.monitoredVitals) {
      setMonitoredVitals(session.monitoredVitals);
    }
  };

  loadVitals();
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
if (
  (monitoredVitals.includes("Blood Pressure") && (!sys || !dia)) ||
  (monitoredVitals.includes("Heart Rate") && !hr) ||
  (monitoredVitals.includes("Blood Sugar") && !sugar) ||
  (monitoredVitals.includes("Oxygen") && !oxygen)
) {
  Alert.alert("Missing data", "Please fill required vitals");
  return;
}


    if (!validateVitals()) return;

    setLoading(true);

    try {
    const input = {
      sys: monitoredVitals.includes("Blood Pressure") ? Number(sys) : null,
      dia: monitoredVitals.includes("Blood Pressure") ? Number(dia) : null,
      hr: monitoredVitals.includes("Heart Rate") ? Number(hr) : null,
      sugar: monitoredVitals.includes("Blood Sugar") ? Number(sugar) : null,
      spo2: monitoredVitals.includes("Oxygen") ? Number(oxygen) : null,
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

  const getOxygenColor = (value: number) => {
  if (value < 90) return "#DC2626"; // red
  if (value < 95) return "#F59E0B"; // amber
  return "#10B981"; // green
};


  /* ---------------- UI ---------------- */

  return (
<View style={{ flex: 1, backgroundColor: "#F3F4F6" }}>

<ScrollView
  contentContainerStyle={{
    padding: 20,
    paddingTop: headerHeight -35 , // 👈 key fix
  }}
>

  
<View style={styles.checkinHeader}>
  <Text style={styles.dateText}>
    {new Date().toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    })}
  </Text>

  <Text style={styles.timeText}>
    {new Date().toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    })}
  </Text>

  <Text style={styles.checkinTitle}>
    Daily Health Check-in
  </Text>

  <Text style={styles.checkinSubtitle}>
    Please enter today’s readings.  
    This helps us keep track of your health.
  </Text>
</View>


<Text style={styles.progressHint}>
  Step 1 of 3 • Today’s Health Readings
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
{monitoredVitals.includes("Blood Pressure") && (
  <>
    <Text style={styles.section}>
      Blood Pressure (BP)
    </Text>

    <View style={styles.bpWrapper}>
      <View style={styles.bpBox}>
        <Text style={styles.bpLabel}>SYS</Text>
        <TextInput
          style={styles.bpInput}
          placeholder="120"
          placeholderTextColor="#9CA3AF"
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
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={dia}
          onChangeText={setDia}
        />
      </View>
    </View>
  </>
)}


      {/* OTHER VITALS */}
{monitoredVitals.includes("Heart Rate") && (
  <NumberStepperInput
    label="Heart Rate"
    value={hr}
    onChange={setHr}
    step={1}
    unit="bpm"
    min={30}
    max={200}
  />
)}

{monitoredVitals.includes("Blood Sugar") && (
  <NumberStepperInput
    label="Blood Sugar"
    value={sugar}
    onChange={setSugar}
    step={5}
    unit="mg/dL"
    min={40}
    max={500}
  />
)}


<Text style={styles.section}>Oxygen Level (SpO₂)</Text>

<View style={styles.oxygenBox}>
  <Text
    style={[
      styles.oxygenValue,
      { color: getOxygenColor(oxygen) },
    ]}
  >
    {oxygen}%
  </Text>


  <Slider
    style={{ width: "100%", height: 40 }}
    minimumValue={50}
    maximumValue={100}
    step={1}
    value={oxygen}
    onValueChange={(value) => {
      setOxygen(value);

      if (value < 88) {
        Vibration.vibrate(80);
      }
    }}

    minimumTrackTintColor="#2563EB"
    maximumTrackTintColor="#D1D5DB"
    thumbTintColor="#2563EB"
  />
  
  {oxygen < 92 && (
  <Text style={styles.oxygenWarning}>
    Low oxygen level detected. Please rest and seek help if symptoms persist.
  </Text>
)}

  <Text style={styles.oxygenHint}>
    Normal range: 95–100%
  </Text>
</View>

<Text style={styles.progressHint}>
  Step 2 of 3 • Medicines & Symptoms
</Text>


      {/* MED ADHERENCE */}
      <Text style={styles.section}>
        Medicine Adherence
      </Text>

<TouchableOpacity
  style={{
    flexDirection: "row",
    alignItems: "center",
  }}
  onPress={() => setMissedMeds(!missedMeds)}
  activeOpacity={0.7}
>
  {/* Checkbox */}
  <View
    style={{
      width: 24,
      height: 24,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: "#2563EB",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: missedMeds ? "#2563EB" : "#FFF",
    }}
  >
    {missedMeds && <View style={{ width: 12, height: 12, backgroundColor: "#FFF", borderRadius: 2 }} />}
  </View>

  {/* Label */}
  <Text
    style={{
      fontSize: 14,
      color: "#111827",
      marginLeft: 10,
      flex: 1,
    }}
    numberOfLines={1}
    ellipsizeMode="tail" //
  >
    I missed taking my prescribed medicines today
  </Text>
</TouchableOpacity>
      


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

      <Text style={styles.progressHint}>
  Step 3 of 3 • Review & Submit
</Text>
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
</View>

  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({

 header: {
  marginBottom: 16,
},


subtitle: {
  color: "#6B7280",
  marginTop: 4,
  lineHeight: 18,
  marginBottom: 6,
},

checkinHeader: {
  backgroundColor: "#ECFDF5", // soft green
  borderRadius: 28,           // oval feel
  paddingVertical: 22,
  paddingHorizontal: 18,
  marginBottom: 18,
  borderWidth: 1,
  borderColor: "#D1FAE5",
},

progressHint: {
  textAlign: "center",
  fontSize: 13,
  color: "#6B7280",
  marginBottom: 14,
},

dateText: {
  fontSize: 13,
  color: "#4B5563", // soft gray
  textAlign: "center",
  marginBottom: 2,
},

timeText: {
  fontSize: 13,
  color: "#4B5563",
  textAlign: "center",
  marginBottom: 6,
},


checkinTitle: {
  fontSize: 22,
  fontWeight: "700",
  color: "#065F46", // deep green
  textAlign: "center",
},

checkinSubtitle: {
  fontSize: 14,
  color: "#047857",
  textAlign: "center",
  marginTop: 8,
  lineHeight: 20,
},


  title: {
    fontSize: 22,
    fontWeight: "bold",
    // fontWeight: "700",
  },

  lastCheckIn: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 16,
  },

  backButton: {
  position: "absolute",
  top: 12,          // 👈 sits just below nav bar
  left: 12,
  zIndex: 10,
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

  oxygenBox: {
  backgroundColor: "#FFF",
  padding: 16,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#E5E7EB",
  marginBottom: 12,
},

oxygenValue: {
  fontSize: 22,
  fontWeight: "700",
  textAlign: "center",
  marginBottom: 6,
},

oxygenHint: {
  fontSize: 12,
  color: "#6B7280",
  textAlign: "center",
  marginTop: 6,
},

oxygenWarning: {
  color: "#DC2626",
  fontSize: 13,
  textAlign: "center",
  marginTop: 6,
  fontWeight: "600",
},

});
