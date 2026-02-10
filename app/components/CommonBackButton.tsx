import React from "react";
import { Pressable, Text, StyleSheet, Platform, View } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  color?: string;
  disabled?: boolean;
}

export default function CommonBackButton({
  color = "#111827",
  disabled = false,
}: Props) {
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  if (disabled) {
    return null;
  }

  return (
    <View
      style={[
        styles.wrapper,
        {
          top: insets.top + 6,
        },
      ]}
    >
      <Pressable
        onPress={handleBack}
        style={({ pressed }) => [
          styles.container,
          pressed && styles.pressed,
        ]}
        hitSlop={12}
      >
        <Text style={[styles.text, { color }]}>‹ Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 12,
    zIndex: 100,
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  pressed: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: Platform.OS === "ios" ? "600" : "700",
  },
});
