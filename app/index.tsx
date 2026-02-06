import { useEffect } from 'react';
import { router } from 'expo-router';
import { useEmergency } from './context/EmergencyContext';

export default function Index() {
  const { role, emergencyActive } = useEmergency();

  useEffect(() => {
    if (emergencyActive) {
      router.replace('/emergency' as any);
    } else if (role === 'doctor') {
      router.replace('/doctor' as any);
    } else {
      router.replace('/patient' as any);
    }
  }, [role, emergencyActive]);

  return null;
}
