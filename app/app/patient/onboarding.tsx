import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PatientOnboarding() {
  const finish = async () => {
    await AsyncStorage.setItem("onboardingDone", "true");
    router.replace("/patient");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Patient Onboarding</Text>
      <Button title="Finish" onPress={finish} />
    </View>
  );
}
