import { useState } from "react";
import { EmergencyKey } from "./emergencyGuide";
import EmergencyGreeting from "./EmergencyGreeting";
import EmergencyProtocol from "./EmergencyProtocol";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSession } from "../../utils/storage";
import { View, Image } from "react-native";


export default function Emergency() {
  const [selectedEmergency, setSelectedEmergency] =
    useState<EmergencyKey | null>(null);

  const handleSelectEmergency = async (type: EmergencyKey) => {
    setSelectedEmergency(type);

    const session = await getSession();
    if (!session?.phone) return;

    const phone = session.phone;
    const key = `EMERGENCY_LOG_${phone}`;

    const existing = await AsyncStorage.getItem(key);
    const logs = existing ? JSON.parse(existing) : [];

    logs.push({
      type,
      startedAt: new Date().toISOString(),
      endedAt: null,
    });

    await AsyncStorage.setItem(key, JSON.stringify(logs));
  };

  const handleBackFromProtocol = () => {
    setSelectedEmergency(null);
  };

// If emergency is selected, show protocol ONLY
if (selectedEmergency) {
  return (
    <EmergencyProtocol
      emergencyType={selectedEmergency}
      onBack={handleBackFromProtocol}
    />
  );
}

// Otherwise show selection screen WITH logo
return (
  <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
    <Image
      source={require("../../assets/images/carefast-logo.png")}
      style={{
        position: "absolute",
        top: 60,
        right: 20,
        width: 110,
        height: 40,
        resizeMode: "contain",
        zIndex: 10,
      }}
    />

    <EmergencyGreeting onSelectType={handleSelectEmergency} />
  </View>
);
}
