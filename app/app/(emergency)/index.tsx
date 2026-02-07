import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CAREFAST</Text>

      <Pressable
        style={styles.emergencyBtn}
        onPress={() => router.push("/(emergency)/emergency")}
      >
        <Text style={styles.emergencyText}>START EMERGENCY</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 40,
  },
  emergencyBtn: {
    backgroundColor: "#B00020",
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  emergencyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
