import React from "react";
import { Pressable, Text, StyleSheet, Platform, View } from "react-native";
import { router, type Href } from "expo-router";
import { StyleProp, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  color?: string;
  disabled?: boolean;
  fallbackRoute?: Href;
  style?: StyleProp<ViewStyle>;
}

export default function CommonBackButton({
  color = "#111827",
  disabled = false,
  fallbackRoute = "/",
  style,
}: Props) {
  const insets = useSafeAreaInsets();

const handleBack = () => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace(fallbackRoute);
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
    marginTop: 6,

  },

  container: {
    paddingHorizontal: 0,
    paddingVertical: 4,
    backgroundColor: "transparent",
  },

  pressed: {
    opacity: 0.5,
  },

  text: {
    fontSize: 17,
    fontWeight: Platform.OS === "ios" ? "400" : "600",
  },
});
