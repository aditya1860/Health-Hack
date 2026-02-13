import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import CommonBackButton from "../../components/CommonBackButton";
import * as Clipboard from "expo-clipboard";
import { SafeAreaView } from "react-native-safe-area-context";
import { saveConnectionCode } from "../../utils/connection";
import { getSession } from "../../utils/storage";


export default function ConnectPatient() {
  const [code, setCode] = useState<string | null>(null);

const generateCode = async () => {
  try {
    const session = await getSession();

    if (!session || session.role !== "doctor" || !session.phone) {
      Alert.alert("Error", "Doctor session not found.");
      return;
    }

    // generate local random 6-character code
const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

    // save locally so patient can use it
    await saveConnectionCode(generatedCode, session.phone);

    setCode(generatedCode);

    Alert.alert("Code Generated", "Share this code with the patient.");

  } catch (error) {
    console.log(error);
    Alert.alert("Error", "Failed to generate code.");
  }
};


  const copyCode = async () => {
    if (!code) return;
    await Clipboard.setStringAsync(code);
    Alert.alert("Copied", "Code copied to clipboard.");
  };



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
  fontSize: 24,
  fontWeight: "700",
  marginTop: 55,
  },

  subtitle: {
  color: "#6B7280",
  marginTop: 6,
  marginBottom: 24,
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


return (
  <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={{ paddingHorizontal: 24, flex: 1 }}>

      <CommonBackButton />

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

      <TouchableOpacity style={styles.button} onPress={generateCode}>
        <Text style={styles.buttonText}>
          {code ? "Generate New Code" : "Generate Code"}
        </Text>
      </TouchableOpacity>

    </View>
  </SafeAreaView>
);
}