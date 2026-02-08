import { useState } from "react";
import { EmergencyKey } from "./emergencyGuide";
import EmergencyGreeting from "./EmergencyGreeting";
import ActiveEmergency from "./ActiveEmergency";
import { useEmergency } from "../context/EmergencyContext";

export default function EmergencyScreen() {
  const [emergencyType, setEmergencyType] = useState<EmergencyKey | null>(null);
  const { stopEmergency } = useEmergency();

  if (!emergencyType) {
    return <EmergencyGreeting onSelectType={setEmergencyType} />;
  }

  return (
    <ActiveEmergency
      emergencyType={emergencyType}
      onCancel={stopEmergency}
    />
  );
}
