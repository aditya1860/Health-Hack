import { useState } from "react";
import { EmergencyKey } from "./emergencyGuide";
import EmergencyGreeting from "./EmergencyGreeting";
import EmergencyProtocol from "./EmergencyProtocol";

export default function Emergency() {
  const [selectedEmergency, setSelectedEmergency] = useState<EmergencyKey | null>(null);

  const handleSelectEmergency = (type: EmergencyKey) => {
    setSelectedEmergency(type);
  };

  const handleBackFromProtocol = () => {
    setSelectedEmergency(null);
  };

  // If emergency is selected, show the protocol screen
  if (selectedEmergency) {
    return (
      <EmergencyProtocol
        emergencyType={selectedEmergency}
        onBack={handleBackFromProtocol}
      />
    );
  }

  // Otherwise show the emergency selection screen
  return <EmergencyGreeting onSelectType={handleSelectEmergency} />;
}