import { View, Text, Pressable } from 'react-native';
import { router , type Href } from 'expo-router';
import { useEmergency } from '../../context/EmergencyContext';

export default function RoleSelect() {
  const { setRole } = useEmergency();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: '600' }}>
        Select your role
      </Text>

      <Pressable
        onPress={() => {
          setRole('patient');
          router.replace('/patient' as Href);
        }}
        style={{
          padding: 16,
          backgroundColor: '#2563eb',
          borderRadius: 8,
          width: 200,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Continue as Patient
        </Text>
      </Pressable>

      <Pressable
          onPress={async () => {
          await setRole('doctor');
          router.replace('/doctor');
        }}
        style={{
          padding: 16,
          backgroundColor: '#059669',
          borderRadius: 8,
          width: 200,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Continue as Doctor
        </Text>
      </Pressable>
    </View>
  );
}
