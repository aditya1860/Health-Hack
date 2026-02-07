import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Result() {
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check-in Submitted ✅</Text>

      <Text>Feeling: {params.q1}</Text>
      <Text>Dizziness: {params.q2}</Text>
      <Text>Heart Rate: {params.q3}</Text>
      <Text>Sleep: {params.q4}</Text>
      <Text>Chest Pain: {params.q5}</Text>
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
});
