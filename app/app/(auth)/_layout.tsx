import { View } from "react-native";
import { Stack } from "expo-router";
import EmergencyFab from "../../components/EmergencyFab";

export default function AuthLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />

      {/* Emergency button available on ALL auth screens */}
      <EmergencyFab />
    </View>
  );
}
