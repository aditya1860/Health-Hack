import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Role = 'patient' | 'doctor' | null;

type EmergencyContextType = {
  role: Role;
  setRole: (role: Role) => Promise<void>;
  emergencyActive: boolean;
  startEmergency: () => void;
  stopEmergency: () => void;
  loading: boolean;
};

const EmergencyContext = createContext<EmergencyContextType | undefined>(
  undefined
);

export const EmergencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRoleState] = useState<Role>(null);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRole = async () => {
      const savedRole = await AsyncStorage.getItem('userRole');
      if (savedRole === 'patient' || savedRole === 'doctor') {
        setRoleState(savedRole);
      }
      setLoading(false);
    };
    loadRole();
  }, []);

  const setRole = async (newRole: Role) => {
    if (newRole) {
      await AsyncStorage.setItem('userRole', newRole);
    } else {
      await AsyncStorage.removeItem('userRole');
    }
    setRoleState(newRole);
  };

  return (
    <EmergencyContext.Provider
      value={{
        role,
        setRole,
        emergencyActive,
        startEmergency: () => setEmergencyActive(true),
        stopEmergency: () => setEmergencyActive(false),
        loading,
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
