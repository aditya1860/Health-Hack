import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { logout } from '../../utils/storage';

export default function PatientDashboard() {
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
        Patient Dashboard
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: '#6b7280',
          marginBottom: 30,
          textAlign: 'center',
        }}
      >
        Welcome! You are logged in as a patient.
      </Text>

      <Pressable
        onPress={handleLogout}
        style={{
          backgroundColor: '#dc2626',
          paddingVertical: 14,
          paddingHorizontal: 30,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: '#ffffff',
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
