import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import CommonBackButton from "../../components/CommonBackButton";

export default function ConnectDoctor() {
  const [code, setCode] = useState("");

  const handleConnect = () => {
    if (!code.trim()) {
      Alert.alert("Invalid Code", "Please enter the connection code.");
      return;
    }

    Alert.alert(
      "Connecting",
      "Attempting to connect with your doctor..."
    );
  };

  return (
    <View style={styles.container}>
      <CommonBackButton />

      <Text style={styles.title}>Connect Doctor</Text>
      <Text style={styles.subtitle}>
        Enter the code provided by your doctor.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Code"
        autoCapitalize="characters"
        value={code}
        onChangeText={setCode}
      />

      <TouchableOpacity style={styles.button} onPress={handleConnect}>
        <Text style={styles.buttonText}>Connect</Text>
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
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 14,
    marginTop: 24,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
