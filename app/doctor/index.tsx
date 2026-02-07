import { View, Text, Button } from 'react-native';
import { useEmergency } from '../context/EmergencyContext';

export default function Doctor() {
  const { setRole } = useEmergency();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Doctor Screen</Text>
      <Button title="Switch to Patient" onPress={() => setRole('patient')} />
    </View>
  );
}
