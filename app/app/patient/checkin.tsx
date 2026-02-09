import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import SymptomCheckbox from "./components/SymptomCheckbox";

export default function CheckIn() {
  const [bp, setBp] = useState("");
  const [hr, setHr] = useState("");
  const [sugar, setSugar] = useState("");
  const [missedMeds, setMissedMeds] = useState(false);

  const [symptoms, setSymptoms] = useState<string[]>([]);

  const toggleSymptom = (symptom: string) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter((s) => s !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const calculateRisk = () => {
    alert("Risk calculated (Demo)");
  };

  return (
    <ScrollView style={styles.container}>

      {/* TITLE */}
      <Text style={styles.title}>
        Daily Health Check-In
      </Text>

      <Text style={styles.subtitle}>
        Answer these questions to assess your current health risk level
      </Text>

      {/* VITAL SIGNS */}
      <Text style={styles.section}>
        Vital Signs
      </Text>

      <View style={styles.vitalsRow}>
        <TextInput
          style={styles.input}
          placeholder="BP e.g. 120/80"
          value={bp}
          onChangeText={setBp}
        />

        <TextInput
          style={styles.input}
          placeholder="Heart Rate e.g. 72"
          value={hr}
          onChangeText={setHr}
        />

        <TextInput
          style={styles.input}
          placeholder="Sugar e.g. 100"
          value={sugar}
          onChangeText={setSugar}
        />
      </View>

      {/* MEDICINE */}
      <Text style={styles.section}>
        Medicine Adherence
      </Text>

      <SymptomCheckbox
        label="I missed taking my prescribed medicines today"
        selected={missedMeds}
        onPress={() => setMissedMeds(!missedMeds)}
      />

      {/* SYMPTOMS */}
      <Text style={styles.section}>
        Symptoms (Select all that apply)
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
            selected={symptoms.includes(symptom)}
            onPress={() => toggleSymptom(symptom)}
          />
        ))}

      </View>

      {/* BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={calculateRisk}
      >
        <Text style={styles.buttonText}>
          Calculate Risk Level
        </Text>
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
  },

  subtitle: {
    color: "#6B7280",
    marginBottom: 20,
  },

  section: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 10,
  },

  vitalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 10,
    width: "32%",
    borderWidth: 1,
    borderColor: "#E5E7EB",
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
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});
