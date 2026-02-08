import { useState } from "react";
import { EmergencyKey } from "./emergencyGuide";
import EmergencyGreeting from "./EmergencyGreeting";
import ActiveEmergency from "./ActiveEmergency";
import { useEmergency } from "../../context/EmergencyContext";

export default function EmergencyScreen() {
  const [emergencyType, setEmergencyType] = useState<EmergencyKey | null>(null);
  const { stopEmergency } = useEmergency();

  const handleSelectType = (type: EmergencyKey) => {
    setEmergencyType(type);
    // Type is selected, which triggers location sharing in ActiveEmergency component
  };

  const handleCancelEmergency = () => {
    stopEmergency();
  };

  // Show greeting screen until emergency type is selected
  if (!emergencyType) {
    return <EmergencyGreeting onSelectType={handleSelectType} />;
  }

  // Show active emergency screen with guidance
  return (
    <ActiveEmergency 
      emergencyType={emergencyType}
      onCancel={handleCancelEmergency}
    />
  );
}