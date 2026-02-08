import { View, Text } from 'react-native';
import { useEffect } from 'react';
import { router, useRootNavigationState } from 'expo-router';
import { useEmergency } from '../context/EmergencyContext';

export default function Index() {
  const navState = useRootNavigationState();
  const { role, loading } = useEmergency();

  useEffect(() => {
    if (!navState?.key || loading) return;

    if (!role) {
      router.replace('/role-select');
    } else if (role === 'doctor') {
      router.replace('/doctor');
    } else {
      router.replace('/patient');
    }
  }, [navState, loading, role]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading CAREFAST…</Text>
    </View>
  );
}
