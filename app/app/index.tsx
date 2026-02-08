import { View, Text } from "react-native";
import { router, useRootNavigationState } from "expo-router";
import { useEmergency } from "./context/EmergencyContext";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const navState = useRootNavigationState();
  const { role, loading: emergencyLoading } = useEmergency();
  const [onboardingLoading, setOnboardingLoading] = useState(true);

  useEffect(() => {
    const checkOnboarding = async () => {
      const done = await AsyncStorage.getItem("onboardingDone");

      if (!done) {
        router.replace("/onboarding");
        return;
      }

      setOnboardingLoading(false);
    };

    checkOnboarding();
  }, []);

  useEffect(() => {
    if (!navState?.key) return;
    if (onboardingLoading || emergencyLoading) return;
    
    if (!role) {
      router.replace("/role-select");
    } else if (role === "doctor") {
      router.replace("/doctor");
    } else {
      router.replace("/patient");
    }
  }, [navState, onboardingLoading, emergencyLoading, role]);

  if (onboardingLoading || emergencyLoading) return null;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading CAREFAST…</Text>
    </View>
  );
}
