import React, { createContext, useContext, useState } from 'react';

type Role = 'patient' | 'doctor';

type EmergencyContextType = {
  role: Role;
  setRole: (role: Role) => void;
  emergencyActive: boolean;
  startEmergency: () => void;
  stopEmergency: () => void;
};

const EmergencyContext = createContext<EmergencyContextType | undefined>(
  undefined
);

export const EmergencyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [role, setRole] = useState<Role>('patient');
  const [emergencyActive, setEmergencyActive] = useState(false);

  return (
    <EmergencyContext.Provider
      value={{
        role,
        setRole,
        emergencyActive,
        startEmergency: () => setEmergencyActive(true),
        stopEmergency: () => setEmergencyActive(false),
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => {
  const ctx = useContext(EmergencyContext);
  if (!ctx) {
    throw new Error('useEmergency must be used inside EmergencyProvider');
  }
  return ctx;
};
