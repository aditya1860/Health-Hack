import { View, Text, Button } from 'react-native';
import { useEmergency } from '../context/EmergencyContext';

export default function Emergency() {
  const { stopEmergency } = useEmergency();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffdede',
      }}
    >
      <Text>EMERGENCY ACTIVE</Text>
      <Button title="Resolve" onPress={stopEmergency} />
    </View>
  );
}
