import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import CommonBackButton from "../../components/CommonBackButton";
import * as Clipboard from "expo-clipboard";
import { getSession } from "../../utils/storage";
import { saveConnectionCode } from "../../utils/connection";


export default function ConnectPatient() {
  const [code, setCode] = useState<string | null>(null);

const generateCode = async () => {
  const newCode = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

const session = await getSession();

if (!session || session.role !== "doctor" || !session.phone) {
  Alert.alert("Error", "Doctor session not found.");
  return;
}

await saveConnectionCode(newCode, session.phone);


  await saveConnectionCode(newCode, session.id);
  setCode(newCode);

  Alert.alert("Code Generated", "Share this code with the patient.");
};

  const copyCode = async () => {
    if (!code) return;
    await Clipboard.setStringAsync(code);
    Alert.alert("Copied", "Code copied to clipboard.");
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Connect Patient</Text>
      <Text style={styles.subtitle}>
        Generate a code and share it with your patient.
      </Text>

      {code && (
        <>
          <Text style={styles.code}>{code}</Text>

          <TouchableOpacity style={styles.secondaryButton} onPress={copyCode}>
            <Text style={styles.secondaryText}>Copy Code</Text>
          </TouchableOpacity>
        </>
      )}

            <CommonBackButton />

      <TouchableOpacity style={styles.button} onPress={generateCode}>
        <Text style={styles.buttonText}>
          {code ? "Generate New Code" : "Generate Code"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 24,
  },
  subtitle: {
    color: "#6B7280",
    marginTop: 8,
  },
  code: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: 4,
    textAlign: "center",
    marginVertical: 32,
    color: "#2563EB",
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  secondaryButton: {
  marginBottom: 16,
  borderWidth: 1,
  borderColor: "#2563EB",
  padding: 12,
  borderRadius: 8,
  alignItems: "center",
},

secondaryText: {
  color: "#2563EB",
  fontWeight: "600",
},

});
