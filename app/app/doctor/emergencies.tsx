import { View, Text, StyleSheet } from "react-native";

export default function EmergenciesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergencies</Text>
      <Text>Emergency list (mock)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12
  }
});
