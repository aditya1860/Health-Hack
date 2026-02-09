import { View, Text } from "react-native";
import { router } from "expo-router";
import { useEmergency } from "../context/EmergencyContext";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSession } from "../utils/storage";

export default function Index() {
  const { loading: emergencyLoading } = useEmergency();

  useEffect(() => {
    if (emergencyLoading) return;

    const init = async () => {
      try {
        const done = await AsyncStorage.getItem("onboardingDone");

        if (done !== "true") {
          router.replace("/onboarding");
          return;
        }

        const session = await getSession();

        if (!session) {
          router.replace("/role-select");
          return;
        }

        router.replace(
          session.role === "doctor" ? "/doctor" : "/patient"
        );
      } catch (e) {
        console.log("Root routing error:", e);
      }
    };

    init();
  }, [emergencyLoading]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading CAREFAST…</Text>
    </View>
  );
}
