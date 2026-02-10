import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { EmergencyProvider } from "../context/EmergencyContext";
import { BackHandler, Platform } from "react-native";
import { useColorScheme } from "../hooks/use-color-scheme";
import { useEffect } from "react";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (Platform.OS !== "android") return;

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (router.canGoBack()) {
          router.back();
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, []);

  return (
    <EmergencyProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{ headerShown: false }}
          initialRouteName="index"
        />
        <StatusBar style="auto" />
      </ThemeProvider>
    </EmergencyProvider>
  );
}
