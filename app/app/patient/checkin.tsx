import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function CheckIn() {
  const router = useRouter();

  const [answers, setAnswers] = useState({
    sugar: "",
    heartRate: "",
    bloodPressure: "",
    oxygen: "",
    feeling: "",
  });

  const handleSubmit = () => {
    router.push({
      pathname: "./result",
      params: answers,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Daily Health Check-in</Text>
      <Text style={styles.subtitle}>
        Please enter today’s health readings
      </Text>

      {/* Blood Sugar */}
      <Text style={styles.label}>Blood Sugar (mg/dL)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="e.g. 110"
        onChangeText={(text) =>
          setAnswers({ ...answers, sugar: text })
        }
      />

      {/* Heart Rate */}
      <Text style={styles.label}>Heart Rate (BPM)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="e.g. 72"
        onChangeText={(text) =>
          setAnswers({ ...answers, heartRate: text })
        }
      />

      {/* Blood Pressure */}
      <Text style={styles.label}>Blood Pressure</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 120/80"
        onChangeText={(text) =>
          setAnswers({ ...answers, bloodPressure: text })
        }
      />

      {/* Oxygen */}
      <Text style={styles.label}>Oxygen Level (SpO₂ %)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="e.g. 98"
        onChangeText={(text) =>
          setAnswers({ ...answers, oxygen: text })
        }
      />

      {/* Feeling */}
      <Text style={styles.label}>How are you feeling?</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        placeholder="Describe symptoms if any..."
        onChangeText={(text) =>
          setAnswers({ ...answers, feeling: text })
        }
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Check-in</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#6B7280",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
   