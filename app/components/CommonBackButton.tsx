import { Pressable, Text, StyleSheet, Platform } from "react-native";
import { router } from "expo-router";

interface Props {
  color?: string;
}

export default function CommonBackButton({ color = "#111827" }: Props) {
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/"); // safe fallback
    }
  };

  return (
    <Pressable onPress={handleBack} style={styles.container}>
      <Text style={[styles.text, { color }]}>
        ‹ Back
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: Platform.OS === "ios" ? "600" : "700",
  },
});
