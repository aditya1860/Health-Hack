import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { EmergencyProvider } from './context/EmergencyContext';
import { useColorScheme } from '../hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <EmergencyProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{ headerShown: false }}
          initialRouteName="index"
        />
        <StatusBar style="auto" />
      </ThemeProvider>
    </EmergencyProvider>
  );
}
