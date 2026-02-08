import { View, Text, Pressable } from 'react-native';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { getSession, logout } from '../../utils/storage';

export default function DoctorDashboard() {
  // 🔐 Protect doctor route
  useEffect(() => {
    const checkAuth = async () => {
      const user = await getSession();

      if (!user || user.role !== 'doctor') {
        router.replace('/doctor-login');
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace('/role-select');
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: '700',
          marginBottom: 20,
          color: '#111827',
        }}
      >
        Doctor Dashboard
      </Text>

      <Pressable
        onPress={handleLogout}
        style={{
          backgroundColor: '#dc2626',
          paddingVertical: 14,
          paddingHorizontal: 28,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
          }}
        >
          Logout
        </Text>
      </Pressable>
    </View>
  );
}
