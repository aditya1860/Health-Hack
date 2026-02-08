import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Onboarding() {
  const router = useRouter();

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("onboardingDone", "true");
    router.replace("./");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Medical History
      </Text>

      <Text style={styles.subtitle}>
        Please select conditions you have been diagnosed with.
      </Text>

      <View style={styles.card}>
        <Text>Diabetes</Text>
      </View>

      <View style={styles.card}>
        <Text>Thyroid Disorder</Text>
      </View>

      <View style={styles.card}>
        <Text>Heart Condition</Text>
      </View>

      <View style={styles.card}>
        <Text>High Blood Pressure</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={completeOnboarding}
      >
        <Text style={styles.buttonText}>
          Continue to Dashboard
        </Text>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 20,
    color: "#6B7280",
  },
  card: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});

