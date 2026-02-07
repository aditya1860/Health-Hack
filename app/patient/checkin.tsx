import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function CheckIn() {
  const router = useRouter();

  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const handleSubmit = () => {
   router.push({
  pathname: "./result",
  params: answers,
});

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Check-in</Text>

      <TextInput
        style={styles.input}
        placeholder="1. How are you feeling today?"
        onChangeText={(text) => setAnswers({ ...answers, q1: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="2. Any dizziness?"
        onChangeText={(text) => setAnswers({ ...answers, q2: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="3. Heart rate normal?"
        onChangeText={(text) => setAnswers({ ...answers, q3: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="4. Did you sleep well?"
        onChangeText={(text) => setAnswers({ ...answers, q4: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="5. Any chest pain?"
        onChangeText={(text) => setAnswers({ ...answers, q5: text })}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
