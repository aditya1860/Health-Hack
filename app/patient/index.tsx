import { View, Text, Button } from 'react-native';
import { useEmergency } from '../context/EmergencyContext';

export default function Patient() {
  const { startEmergency, setRole } = useEmergency();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Patient Screen</Text>
      <Button title="Emergency" onPress={startEmergency} />
      <Button title="Switch to Doctor" onPress={() => setRole('doctor')} />
    </View>
  );
}
