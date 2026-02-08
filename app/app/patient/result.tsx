import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Result() {
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check-in Submitted ✅</Text>

      <Text>Blood Sugar: {params.sugar}</Text>
<Text>Heart Rate: {params.heartRate}</Text>
<Text>Blood Pressure: {params.bloodPressure}</Text>
<Text>Oxygen: {params.oxygen}</Text>
<Text>Feeling: {params.feeling}</Text>

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
