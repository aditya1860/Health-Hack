import { View, Text } from "react-native";
import { router, useRootNavigationState } from "expo-router";
import { useEmergency } from "./context/EmergencyContext";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSession } from "../utils/storage";


export default function Index() {
  const navState = useRootNavigationState();
  const { role, loading: emergencyLoading } = useEmergency();
  const [onboardingLoading, setOnboardingLoading] = useState(true);
  const [onboardingDone, setOnboardingDone] = useState<boolean | null>(null);


useEffect(() => {
  const checkOnboarding = async () => {
    const done = await AsyncStorage.getItem("onboardingDone");
    setOnboardingDone(!!done);
    setOnboardingLoading(false);
  };

  checkOnboarding();
}, []);


useEffect(() => {
  const resolveRoute = async () => {
    if (!navState?.key) return;
    if (onboardingLoading || emergencyLoading) return;
    if (onboardingDone === null) return;

    if (!onboardingDone) {
      router.replace("/onboarding");
      return;
    }

    const session = await getSession();

    if (!session) {
      router.replace("/role-select");
      return;
    }

    if (session.role === "doctor") {
      router.replace("/doctor");
    } else {
      router.replace("/patient");
    }
  };

  resolveRoute();
}, [navState, onboardingLoading, emergencyLoading, onboardingDone]);

if (onboardingLoading || emergencyLoading) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading CAREFAST…</Text>
    </View>
  );
}

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading CAREFAST…</Text>
    </View>
  );
}
