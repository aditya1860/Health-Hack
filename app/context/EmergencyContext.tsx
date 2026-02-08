import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

type Role = 'patient' | 'doctor' | null;

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
  const [role, setRole] = useState<Role>(null);
  const [emergencyActive, setEmergencyActive] = useState(false);

  useEffect(() => {
    const loadRole = async () => {
      const savedRole = await AsyncStorage.getItem('userRole');
      if (savedRole === 'patient' || savedRole === 'doctor') {
        setRole(savedRole);
      }
    };
    loadRole();
  }, [])
  const updateRole = async (newRole: Role) => {
  if (newRole === null) {
    await AsyncStorage.removeItem('userRole');
  } else {
    await AsyncStorage.setItem('userRole', newRole);
  }
  setRole(newRole);
};
;

  return (
    <EmergencyContext.Provider
    value={{
      role,
      setRole: updateRole,
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
