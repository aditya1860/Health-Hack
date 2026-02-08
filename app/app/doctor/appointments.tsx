import { View, Text } from "react-native";

export default function AppointmentsScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Appointments
      </Text>
      <Text>Upcoming appointments (mock)</Text>
    </View>
  );
}
