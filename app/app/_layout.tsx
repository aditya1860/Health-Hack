import { Slot } from 'expo-router';
import { EmergencyProvider } from '../context/EmergencyContext';

export default function RootLayout() {
  return (
    <EmergencyProvider>
      <Slot />
    </EmergencyProvider>
  );
}
